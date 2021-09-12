const { DYNAMODB_CLIENT } = require('./../config');
const { getDynamodbResponseError, deepScan: deepScanUtil } = require('./../helpers/utlis');

class Database {
  constructor() {
  }

  static async putItem(params) {
    try {
      const result = await DYNAMODB_CLIENT.put(DatabaseParamsBuilder.putItem(params)).promise();
  
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
      const result = await DYNAMODB_CLIENT.query(DatabaseParamsBuilder.query(params)).promise();
  
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
      const result = await deepScanUtil(DYNAMODB_CLIENT, DatabaseParamsBuilder.deepScan(params));
    
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
      const result = await DYNAMODB_CLIENT.scan(DatabaseParamsBuilder.scan(params)).promise();
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
      const result = await DYNAMODB_CLIENT.get(DatabaseParamsBuilder.get(params)).promise();
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
      const result = await DYNAMODB_CLIENT.update(DatabaseParamsBuilder.update(params)).promise();
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

class DatabaseParamsBuilder {
  constructor() {
  }
  static scan(payload) {
    return {
      TableName: payload.tableName,
      AttributesToGet: payload.attributesToGet,
      ConditionalOperator: payload.conditionalOperator,
      ConsistentRead: payload.consistentRead,
      ExclusiveStartKey: payload.exclusiveStartKey,
      ExpressionAttributeNames: payload.expressionAttributeNames,
      ExpressionAttributeValues: payload.ExpressionAttributeValues,
      FilterExpression: payload.filterExpression,
      IndexName: payload.indexName,
      Limit: payload.limit,
      ProjectionExpression: payload.projectionExpression,
      ReturnConsumedCapacity: payload.returnConsumedCapacity,
      ScanFilter: payload.scanFilter,
      Segment: payload.segment,
      Select: payload.select,
      TotalSegments: payload.totalSegments
    };
  }

  static deepScan(payload) {
    return {
      TableName: payload.tableName,
      AttributesToGet: payload.attributesToGet,
      ConsistentRead: payload.consistentRead,
      KeyConditionExpression: payload.keyConditionExpression,
      ExclusiveStartKey: payload.exclusiveStartKey,
      ExpressionAttributeNames: payload.expressionAttributeNames,
      ExpressionAttributeValues: payload.expressionAttributeValues,
      FilterExpression: payload.filterExpression,
      IndexName: payload.indexName,
      ProjectionExpression: payload.projectionExpression,
      ReturnConsumedCapacity: payload.returnConsumedCapacity,
      ScanFilter: payload.scanFilter,
      Segment: payload.segment,
      Select: payload.select,
      TotalSegments: payload.totalSegments
    };
  }

  static putItem(payload) {
    return {
      TableName: payload.tableName,
      Item: payload.item
    };
  }

  static query(payload) {
    return {
      TableName: payload.tableName,
      IndexName: payload.indexName,
      KeyConditionExpression: payload.keyConditionExpression,
      ExpressionAttributeValues: payload.expressionAttributeValues,
      Limit: payload.limit
    }; 
  }

  static get(payload) {
    return {
      TableName: payload.tableName,
      Key: payload.key
    };
  }

  static update(payload) {
    return {
      TableName: payload.tableName,
      Key: payload.key
    };
  }
}

module.exports = Database;
