const { USERS_TABLE_NAME } = require('./../../config');
const { buildUpdatAccountStatusParams } = require('./commonMapper');

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

const buildGetUsersByStatusParams = status => {
  return {
    tableName: USERS_TABLE_NAME,
    filterExpression: "accountStatus = :value",
    expressionAttributeValues: {
        ':value': status
    }
  };
};

const buildCreateUserParams = payload => {
  return {
    tableName: USERS_TABLE_NAME,
    item: payload
  };
};

const buildUpdateUserAccountStatusParams = payload => {
  payload.tableName = USERS_TABLE_NAME;
  return buildUpdatAccountStatusParams(payload);
};

module.exports = {
  buildGetUserByEmailParams,
  buildGetUserByIdParams,
  buildUpdateUserParams,
  buildGetUsersByStatusParams,
  buildCreateUserParams,
  buildUpdateUserAccountStatusParams
};
