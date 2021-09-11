const { RequestError } = require('./../../helpers/errors');
const { putItem, query, deepScan, scan, get } = require('./../repository/clientRepository');
const {
  buildPutItemsParams,
  buildQueryParams,
  buildGetParams
} = require('./../mapper/clientMapper');
const {
  buildGetUserByEmailParams,
  buildGetUserByIdParams,
  buildUpdateUserParams
} = require('./../mapper/userMapper');

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

const updateUser = async(id, payload) => {
  try {
    const existingUser = await getUserByIdHandler(id);
    
    if (existingUser) {
      throw new RequestError(USER_ALREADY_EXISTS, CONFLICT_CODE, CONFLICT_SCOPE);
    }

    console.log(payload);
    return existingUser;
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

    return { payload };
  } catch (error) {
    console.log(`UserService -> updateUser -> error -> ${JSON.stringify(error)}`);
    throw error;
  }
};

const getUserByEmail = async payload => {
  try {
    const params = buildGetUserByEmailParams(payload);
    const response = await query(buildQueryParams(params));

    return response.Items[0];
  } catch (error) {
    console.log('AuthService -> getUserByEmail -> error -> ', error);
    throw error;
  }
};

const getUserByIdHandler = async payload => {
  try {
    const params = buildGetUserByIdParams(payload);
    const response = await get(buildGetParams(params));

    return response;
  } catch (error) {
    console.log('AuthService -> getUserByEmail -> error -> ', error);
    throw error;
  }
};


module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  getUserByEmail
};