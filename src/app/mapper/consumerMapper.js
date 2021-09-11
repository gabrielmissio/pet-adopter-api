

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
    ExclusiveStartKey: payload.exclusiveStartKey,
    ExpressionAttributeNames: payload.expressionAttributeNames,
    ExpressionAttributeValues: payload.ExpressionAttributeValues,
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

module.exports = {
  buildScanParams,
  buildDeepScanParams
};
