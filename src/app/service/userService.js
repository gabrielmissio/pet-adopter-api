const { mergeObjects } = require('./../../helpers/utlis')
const { RequestError } = require('./../../helpers/errors');
const { isAccountActive } = require('./../../helpers/utlis');
const {
  query,
  deepScan,
  update,
  putItem
} = require('./../repository/clientRepository');
const {
  buildQueryParams,
  buildUpdateParams,
  buildDeepScanParams,
  buildPutItemsParams
} = require('./../mapper/clientMapper');
const {
  buildGetUserByEmailParams,
  buildUpdateUserParams,
  buildGetUsersByStatusParams,
  buildUpdateUserAccountStatusParams,
  buildCreateUserParams
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

const UserRepository = require('./../repository/userRepository');

const getUsers = async payload => {
  try {
    const users = await getUsersByStatus(payload.accountStatus);

    return users;
  } catch (error) {
    console.log(`UserService -> updateUser -> error -> ${JSON.stringify(error)}`);
    throw error;
  }
};

const updateUser = async(id, payload) => {
  try {
    const userToUpdate = await UserRepository.getById(id);
    if (!userToUpdate) {
      throw new RequestError(USER_NOT_FOUND, NOT_FOUND_CODE, NOT_FOUND_SCOPE);
    }

    if (!isAccountActive(userToUpdate)) {
      throw new RequestError(USER_WITH_INACTIVE_ACCOUNT, UNAUTHORIZED_CODE, INACTIVE_ACCOUNT_SCOPE);
    }

    payload.id = id;
    payload.createdAt = userToUpdate.createdAt;
    payload.matches = userToUpdate.matches;
    payload.password = userToUpdate.password;// TODO: remove this shit
    const mergedObject = mergeObjects(userToUpdate, payload);
    
    // TODO: validate response
    await UserRepository.create(mergedObject);
    return mergedObject;
  } catch (error) {
    console.log(`UserService -> updateUser -> error -> ${JSON.stringify(error)}`);
    throw error;
  }
};

const deleteUser = async id => {
  try {
    const user = await UserRepository.getById(id);
    if (!user) {
      throw new RequestError(USER_NOT_FOUND, NOT_FOUND_CODE, NOT_FOUND_SCOPE);
    }

    if (!isAccountActive(user)) {
      throw new RequestError(USER_WITH_INACTIVE_ACCOUNT, UNAUTHORIZED_CODE, INACTIVE_ACCOUNT_SCOPE);
    }
    
    const response = await UserRepository.disableAccountById(id);
    

    return response;
  } catch (error) {
    console.log(`UserService -> updateUser -> error -> ${JSON.stringify(error)}`);
    throw error;
  }
};

const getUserById = async id => {
  try {
    const user = await UserRepository.getById(id);
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

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  getUserById
};