let mime = require('mime-types')
const bucketName = 'pet-adoper-photos';
const parser = require('lambda-multipart-parser');
const { v4: uuid } = require('uuid');
const { S3_CLIENT } = require('./../../config');
const { createPhotoURL } = require('./../service/userService');

exports.handler = async event => {
  try{
    const headersLowerCase = {}
    const headers = Object.keys(event.multiValueHeaders);

    headers.map(key => headersLowerCase[key.toLowerCase()] = event.headers[key]);
    validateInputHeaders(headersLowerCase);
    
    const type = headersLowerCase.type;
    const id = headersLowerCase.id;

    const result = await parser.parse(event);
    const { fileContent, contentType, fullFileName } = getFileParamers(result);
    const key = `${type}/` + '/' + id + '/' +  fullFileName;
    
    const s3Response = await uploadFileToS3(fileContent, contentType, key);
    // valite response
    const URL = `https://${bucketName}.s3.amazonaws.com/` + key;

    const appendPhotoUrlToMember = headersLowerCase.type === 'user' ? await createPhotoURL({id: id, url: URL}) : (() => console.log('okkkkk'));
    console.log(appendPhotoUrlToMember);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'ok',
        path: URL
      })
    };
  }
  catch(err){
    console.log(err)
    return {
      statusCode: 500,
      headers: {},
      body: JSON.stringify(err)
    };
  }
};

const getFileParamers = decodedPayload => {
  const fileContent = decodedPayload.files[0].content;
  const fileName = `${uuid()}`;
  const contentType = decodedPayload.files[0].contentType;
  const extension = contentType ? mime.extension(contentType) : '';
  const fullFileName = extension ? `${fileName}.${extension}` : fileName;
  return {
    fileContent,
    contentType,
    fullFileName
  };
};

const validateInputHeaders = headers => {
  if(!headers.type){
    throw new Error(`Type is required.`)
  }
  
  const availablesTypes = ['pet', 'user'];
  if(!availablesTypes.includes(headers.type))
    throw new Error(`Type ${type} does not exist!`);

  if(!headers.id)
    throw new Error(`ID is required.`)
};

const uploadFileToS3 = async (fileContent, contentType, key) => {
  console.log('Submitting the file to S3', key);

  const s3response = await S3_CLIENT.putObject({
    Bucket: bucketName,
    Key: key,
    Body: fileContent,
    Metadata: {},
    ContentType: contentType,
    ACL:'public-read'
  }).promise();

  console.log('Successfully uploaded file', key);
  return s3response
};
