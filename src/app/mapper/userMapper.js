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
    tableName: USERS_TABLE_NAME,
    key: {
      'id': payload.id
    },
    updateExpression: 'set info = :value',
    expressionAttributeValues: {':value': payload.value}
  };
};

const buildUserInfoObject = payload => {
  return {
    updatedAt: Date.now(),
    addresses: payload.addresses || [],
    adptions: payload.adptions || []
  };
};


module.exports = {
  buildGetUserByEmailParams,
  buildGetUserByIdParams,
  buildUpdateUserParams,
  buildUserInfoObject
};
