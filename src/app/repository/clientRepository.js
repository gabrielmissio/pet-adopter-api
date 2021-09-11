const { DYNAMODB_CLIENT } = require('./../../config');
const { getDynamodbResponseError, deepScan: deepScanUtil } = require('./.././../helpers/utlis');

const putItem = async params => {
  try {
    const result = await DYNAMODB_CLIENT.put(params).promise();

    if (getDynamodbResponseError(result)) {
      throw Error(result.$response.error);
    }

    return result;
  } catch (error) {
    console.error(`AuthRepository -> putItem -> error -> \n ${JSON.stringify(error)}`);
    throw new Error(error);
  }
};

const query = async params => {
  try {
    const result = await DYNAMODB_CLIENT.query(params).promise();

    if (getDynamodbResponseError(result)) {
      throw Error(result.$response.error);
    }

    return result;
  } catch (error) {
    console.error(`ProfileRepository -> getProfileByEmail -> error -> \n ${JSON.stringify(error)}`);
    throw new Error(error);
  }
};

const deepScan = async params => {
  try {
    const result = await deepScanUtil(DYNAMODB_CLIENT, params);
  
    if (getDynamodbResponseError(result)) {
      throw Error(getDynamodbResponseError(result));
    }
  
    return result;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const scan = async params => {
  try {
    const result = await DYNAMODB_CLIENT.scan(params).promise();
    if (getDynamodbResponseError(result)) {
      throw Error(getDynamodbResponseError(result));
    }
  
    return result;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};


module.exports = {
  putItem,
  query,
  deepScan,
  scan
};
