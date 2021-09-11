const { getDynamodbResponseError, deepScan: deepScanUtil } = require('./.././../helpers/utlis');
const { DYNAMODB_CLIENT } = require('./../../config');

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
  scan,
  deepScan
};
