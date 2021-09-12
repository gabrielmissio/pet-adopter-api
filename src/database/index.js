const { DYNAMODB_CLIENT } = require('./../config');
const { getDynamodbResponseError, deepScan: deepScanUtil } = require('./../helpers/utlis');

class Database {
  constructor() {
  }

  static async putItem(params) {
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
  }

  static async query(params) {
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
  }

  static async deepScan(params) {
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
  }

  static async scan(params) {
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
  }

  static async get(params) {
    try {
      const result = await DYNAMODB_CLIENT.get(params).promise();
      if (getDynamodbResponseError(result)) {
        throw Error(getDynamodbResponseError(result));
      }
    
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async update(params) {
    try {
      const result = await DYNAMODB_CLIENT.update(params).promise();
      if (getDynamodbResponseError(result)) {
        throw Error(getDynamodbResponseError(result));
      }
    
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

}


module.exports = Database;
