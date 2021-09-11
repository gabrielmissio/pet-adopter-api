const { v4: uuid } = require('uuid');
const { PETS_TABLE_NAME } = require('./../../config');

const buildPetObject = payload => {
  return {
    id: payload.id || uuid(),
    specie: payload.specie,
    breed: payload.breed,
    name: payload.name,
    size: payload.size,
    estimatedAge: payload.estimatedAge,
    estimatedLongevity: payload.estimatedLongevity,
    accountStatus: payload.accountStatus || 'active',
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

module.exports = {
  buildPetObject,
  buildCreatePetParams
};
