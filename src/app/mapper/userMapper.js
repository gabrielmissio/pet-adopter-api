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

module.exports = {
  buildGetUserByEmailParams
};
