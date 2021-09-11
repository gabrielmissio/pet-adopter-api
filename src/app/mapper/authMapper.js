const { USERS_TABLE_NAME } = require('./../../config');
const { v4: uuid } = require('uuid');

const buildGetUserByEmailParams = payload => {
  return {
    tableName: USERS_TABLE_NAME,
    indexName: 'emailIndex',
    keyConditionExpression: 'email = :email',
    expressionAttributeValues: {
      ':email': payload.email
    },
    Limit: 1
  };
};

const buildCreateUserParams = payload => {
  return {
    tableName: USERS_TABLE_NAME,
    item: payload
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

const buildPutItemsParams = payload => {
  return {
    TableName: payload.tableName,
    Item: payload.item
  };
};

const buildUserObject = payload => {
  return {
    id: payload.id || uuid(),
    name: payload.name,
    email: payload.email,
    password: payload.password,
    createdAt: payload.createdAt || Date.now()
  };
};

module.exports = {
  buildPutItemsParams,
  buildUserObject,
  buildGetUserByEmailParams,
  buildQueryParams,
  buildCreateUserParams
};
