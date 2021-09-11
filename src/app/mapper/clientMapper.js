

const buildScanParams = payload => {
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
};

const buildDeepScanParams = payload => {
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
};

const buildPutItemsParams = payload => {
  return {
    TableName: payload.tableName,
    Item: payload.item
  };
};

const buildQueryParams = payload => {
  return {
    TableName: payload.tableName,
    IndexName: payload.indexName,
    KeyConditionExpression: payload.keyConditionExpression,
    ExpressionAttributeValues: payload.expressionAttributeValues,
    Limit: payload.limit
  };
};

const buildGetParams = payload => {
  return {
    TableName: payload.tableName,
    Key: payload.key
  };
};


const buildUpdateParams = payload => {
  return {
    TableName: payload.tableName,
    Key: payload.key,
    UpdateExpression: payload.updateExpression,
    ExpressionAttributeValues: payload.expressionAttributeValues
  };
};

module.exports = {
  buildScanParams,
  buildDeepScanParams,
  buildPutItemsParams,
  buildQueryParams,
  buildGetParams,
  buildUpdateParams
};
