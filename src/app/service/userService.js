const { RequestError } = require('./../../helpers/errors');
const { isUserIsActive } = require('./../../helpers/utlis');
const {
  query,
  deepScan,
  get,
  update
} = require('./../repository/clientRepository');
const {
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
  buildGetUsersByStatusParams,
  buildUpdateUserAccountStatusParams
} = require('./../mapper/userMapper');

const {
  errorMessagesEnums: {
    USER_NOT_FOUND,
    USER_WITH_INACTIVE_ACCOUNT
  },
  errorScopesEnums: {
    NOT_FOUND: NOT_FOUND_SCOPE,
    INACTIVE_ACCOUNT: INACTIVE_ACCOUNT_SCOPE
  },
  httpCodesEnums: {
    NOT_FOUND: NOT_FOUND_CODE,
    UNAUTHORIZED: UNAUTHORIZED_CODE
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

const deleteUser = async id => { // TODO: implement deleteUserById
  try {
    const user = await getUserByIdHandler(id);
    if (!user) {
      throw new RequestError(USER_NOT_FOUND, NOT_FOUND_CODE, NOT_FOUND_SCOPE);
    }

    if (!isUserIsActive(user)) {
      throw new RequestError(USER_WITH_INACTIVE_ACCOUNT, UNAUTHORIZED_CODE, INACTIVE_ACCOUNT_SCOPE);
    }
    
    const response = await deleteUserById(id);
    

    return response;
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

const deleteUserById = async id => {
  try {
    const params = buildUpdateUserAccountStatusParams({ id: id, accountStatus: 'inactive' });
    const response = await update(buildUpdateParams(params));

    return response;// TODO: validate response
  } catch (error) {
    console.log('AuthService -> getUserByEmail -> error -> ', error);
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