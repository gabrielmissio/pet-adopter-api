const { v4: uuid } = require('uuid');
const { PETS_TABLE_NAME } = require('./../../config');
const { buildUpdatAccountStatusParams } = require('./commonMapper');

const buildPetObject = payload => {
  return {
    id: payload.id || uuid(),
    specie: payload.specie,
    breed: payload.breed,
    name: payload.name,
    size: payload.size,
    estimatedAge: payload.estimatedAge,
    estimatedLongevity: payload.estimatedLongevity,
    accountStatus: payload.accountStatus,
    adoption: payload.adoption || {},
    createdAt: payload.createdAt || Date.now(),
    updatedAt: Date.now(),
    matches: payload.matches || []
  };
};

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
  buildPetObject,
  buildCreatePetParams,
  buildGetPetsByStatusParams,
  buildGetPetByIdParams,
  buildUpdatePetAccountStatusParams
};
