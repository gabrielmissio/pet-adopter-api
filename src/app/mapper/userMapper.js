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

const buildGetUserByIdParams = id => {
  return {
    tableName: USERS_TABLE_NAME,
    key: {
      'id': id
    }
  };
};

const buildUpdateUserParams = payload => {
  return {
    tableName: USERS_TABLE_NAME,
    key: {
      'id': payload.id
    },
    updateExpression: 'set :value',
    expressionAttributeValues: {':value': payload.value}
  };
};

const buildUpdateUserAccountStatusParams = payload => {
  return {
    tableName: USERS_TABLE_NAME,
    key: {
      'id': payload.id
    },
    updateExpression: 'set accountStatus = :value',
    expressionAttributeValues: {':value': payload.accountStatus}
  };
};

const buildGetUsersByStatusParams = status => {
  return {
    tableName: USERS_TABLE_NAME,
    filterExpression: "accountStatus = :value",
    expressionAttributeValues: {
        ':value': status
    }
  };
};

const buildUserObject = payload => {
  return {
    id: payload.id || uuid(),
    name: payload.name,
    email: payload.email,
    password: payload.password,
    accountStatus: payload.accountStatus,
    createdAt: payload.createdAt || Date.now(),
    updatedAt: Date.now(),
    addresses: payload.addresses || [],
    matches: payload.matches || [],
    phones: payload.phones || [],
    adoptions: payload.adoptions || [],
  };
};

const buildCreateUserParams = payload => {
  return {
    tableName: USERS_TABLE_NAME,
    item: payload
  };
};

module.exports = {
  buildGetUserByEmailParams,
  buildGetUserByIdParams,
  buildUpdateUserParams,
  buildUserObject,
  buildGetUsersByStatusParams,
  buildUpdateUserAccountStatusParams,
  buildCreateUserParams
};
