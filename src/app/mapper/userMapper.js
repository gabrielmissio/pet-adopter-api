const { USERS_TABLE_NAME } = require('./../../config');

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
    TableName: USERS_TABLE_NAME,
    Key: {
      'id': payload.id
    },
    UpdateExpression: 'set info = :value',
    ExpressionAttributeValues: {':value': payload.value}
  };
};

module.exports = {
  buildGetUserByEmailParams,
  buildGetUserByIdParams,
  buildUpdateUserParams
};
