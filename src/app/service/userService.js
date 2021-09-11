const { RequestError } = require('./../../helpers/errors');
const {
  putItem,
  query,
  deepScan,
  scan,
  get,
  update
} = require('./../repository/clientRepository');
const {
  buildPutItemsParams,
  buildQueryParams,
  buildGetParams,
  buildUpdateParams,
  buildDeepScanParams,
} = require('./../mapper/clientMapper');
const {
  buildGetUserByEmailParams,
  buildGetUserByIdParams,
  buildUpdateUserParams,
  buildUserInfoObject,
  buildGetUsersByStatusParams
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
    const users = await getUsersByStatus(payload.status);

    return users;
  } catch (error) {
    console.log(`UserService -> updateUser -> error -> ${JSON.stringify(error)}`);
    throw error;
  }
};

const updateUser = async(id, payload) => {
  try {
    const userToUpdate = await getUserByIdHandler(id);
    if (!userToUpdate) {
      throw new RequestError(USER_NOT_FOUND, NOT_FOUND_CODE, NOT_FOUND_SCOPE);
    }

    const user = buildUserInfoObject(payload);// TODO: merge request params with db params
    await update(buildUpdateParams(buildUpdateUserParams({id: id, value: user})));
    // TODO: validate response

    console.log(payload);
    return userToUpdate;
  } catch (error) {
    console.log(`UserService -> updateUser -> error -> ${JSON.stringify(error)}`);
    throw error;
  }
};

const deleteUser = async payload => { // TODO: implement deleteUserById
  try {
    console.log(payload);
    return { message: `DELETE /user/${payload.id}` };
  } catch (error) {
    console.log(`UserService -> updateUser -> error -> ${JSON.stringify(error)}`);
    throw error;
  }
};

const getUserById = async id => {
  try {
    const user = await getUserByIdHandler(id);
    if (!user) {
      throw new RequestError(USER_NOT_FOUND, NOT_FOUND_CODE, NOT_FOUND_SCOPE);
    }

    return user;
  } catch (error) {
    console.log(`UserService -> getUserById -> error -> ${JSON.stringify(error)}`);
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

const getUsersByStatus = async status => {
  try {
    const params = buildGetUsersByStatusParams(status);
    const response = await deepScan(buildDeepScanParams(params));

    return response.Items;
  } catch (error) {
    console.log('AuthService -> getUserByEmail -> error -> ', error);
    throw error;
  }
};

const getUserByIdHandler = async payload => {
  try {
    const params = buildGetUserByIdParams(payload);
    const response = await get(buildGetParams(params));

    return response.Item;
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