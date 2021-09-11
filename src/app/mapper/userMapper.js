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
    updateExpression: 'set info.accountStatus = :value',
    expressionAttributeValues: {':value': payload.accountStatus}
  };
};

const buildGetUsersByStatusParams = status => {
  return {
    tableName: USERS_TABLE_NAME,
    filterExpression: "#info.#accountStatus = :value",
    expressionAttributeNames: {
        '#info': 'info',
        "#accountStatus": "accountStatus"
    },
    expressionAttributeValues: {
        ':value': status
    }
  };
};

const buildUserInfoObject = payload => {
  return {
    updatedAt: Date.now(),
    addresses: payload.addresses,
    matches: payload.matches,
    phones: payload.phones,
    adoptions: payload.adoptions,
    accountStatus: payload.accountStatus
  };
};


module.exports = {
  buildGetUserByEmailParams,
  buildGetUserByIdParams,
  buildUpdateUserParams,
  buildUserInfoObject,
  buildGetUsersByStatusParams,
  buildUpdateUserAccountStatusParams
};
