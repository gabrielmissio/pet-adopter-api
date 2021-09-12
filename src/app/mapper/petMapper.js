const { v4: uuid } = require('uuid');
const { PETS_TABLE_NAME } = require('./../../config');
const { buildUpdatAccountStatusParams } = require('./commonMapper');

const buildCreatePetParams = payload => {
  return {
    tableName: PETS_TABLE_NAME,
    item: payload
  };
};

const buildGetPetsByStatusParams = status => {
  return {
    tableName: PETS_TABLE_NAME,
    filterExpression: "accountStatus = :value",
    expressionAttributeValues: {
        ':value': status
    }
  };
};

const buildGetPetByIdParams = id => {
  return {
    tableName: PETS_TABLE_NAME,
    key: {
      'id': id
    }
  };
};

const buildUpdatePetAccountStatusParams = payload => {
  payload.tableName = PETS_TABLE_NAME;
  return buildUpdatAccountStatusParams(payload);
};

module.exports = {
  buildCreatePetParams,
  buildGetPetsByStatusParams,
  buildGetPetByIdParams,
  buildUpdatePetAccountStatusParams
};
