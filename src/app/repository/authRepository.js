const { DYNAMODB_CLIENT } = require('./../../config');
const { getDynamodbResponseError } = require('./../../helpers/utlis');

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

module.exports = {
  putItem,
  query
};
