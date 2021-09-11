const { USERS_TABLE_NAME } = require('./../../config');
const { v4: uuid } = require('uuid');

const buildCreateAuthUserParams = payload => {
  return {
    tableName: USERS_TABLE_NAME,
    item: payload
  };
};

const buildAuthUserObject = payload => {
  return {
    id: payload.id || uuid(),
    name: payload.name,
    email: payload.email,
    password: payload.password,
    createdAt: payload.createdAt || Date.now(),
    accountStatus: payload.accountStatus
  };
};

module.exports = {
  buildAuthUserObject,
  buildCreateAuthUserParams
};
