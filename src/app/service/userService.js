const { RequestError } = require('./../../helpers/errors');
const { putItem, query, deepScan, scan } = require('./../repository/clientRepository');
const {
  errorMessagesEnums: {
    USER_ALREADY_EXISTS,
    USER_NOT_FOUND,
    INVALID_CREDENTIALS
  },
  errorScopesEnums: {
    INVALID_CREDENTIALS: INVALID_CREDENTIALS_SCOPE,
    NOT_FOUND: NOT_FOUND_SCOPE,
    CONFLICT: CONFLICT_SCOPE
  },
  httpCodesEnums: {
    CONFLICT: CONFLICT_CODE,
    BAD_REQUEST: BAD_REQUEST_CODE,
    NOT_FOUND: NOT_FOUND_CODE
  }
} = require('./../../helpers/enums');

const getUsers = async payload => {
  try {
    console.log(payload);
    return { message: `GET /user` };
  } catch (error) {
    console.log(`UserService -> updateUser -> error -> ${JSON.stringify(error)}`);
    throw error;
  }
};

const updateUser = async payload => {
  try {
    console.log(payload);
    return { message: `PUT /user/${payload.id}` };
  } catch (error) {
    console.log(`UserService -> updateUser -> error -> ${JSON.stringify(error)}`);
    throw error;
  }
};

const deleteUser = async payload => {
  try {
    console.log(payload);
    return { message: `DELETE /user/${payload.id}` };
  } catch (error) {
    console.log(`UserService -> updateUser -> error -> ${JSON.stringify(error)}`);
    throw error;
  }
};

const getUserById = async payload => {
  try {
    // const user = await getUserByEmail(payload);
    
    if (!user) {
      throw new RequestError(USER_NOT_FOUND, NOT_FOUND_CODE, NOT_FOUND_SCOPE);
    }

    return { user };
  } catch (error) {
    console.log(`UserService -> updateUser -> error -> ${JSON.stringify(error)}`);
    throw error;
  }
};

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  getUserById
};