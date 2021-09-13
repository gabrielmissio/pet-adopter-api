const { mergeObjects } = require('./../../helpers/utlis')
const { RequestError } = require('./../../helpers/errors');
const { isAccountActive } = require('./../../helpers/utlis');
const UserRepository = require('./../repository/userRepository');

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
    const users = await UserRepository.getByAccountStatus(payload.accountStatus);

    return users;
  } catch (error) {
    console.log(`UserService -> updateUser -> error -> ${JSON.stringify(error)}`);
    throw error;
  }
};

const updateUser = async payload => {
  try {
    const userToUpdate = await UserRepository.getById(payload.id);
    if (!userToUpdate) {
      throw new RequestError(USER_NOT_FOUND, NOT_FOUND_CODE, NOT_FOUND_SCOPE);
    }

    if (!isAccountActive(userToUpdate)) {
      throw new RequestError(USER_WITH_INACTIVE_ACCOUNT, UNAUTHORIZED_CODE, INACTIVE_ACCOUNT_SCOPE);
    }
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

const deleteUser = async payload => {
  try {
    const user = await UserRepository.getById(payload.id);
    if (!user) {
      throw new RequestError(USER_NOT_FOUND, NOT_FOUND_CODE, NOT_FOUND_SCOPE);
    }

    if (!isAccountActive(user)) {
      throw new RequestError(USER_WITH_INACTIVE_ACCOUNT, UNAUTHORIZED_CODE, INACTIVE_ACCOUNT_SCOPE);
    }
    
    const response = await UserRepository.disableAccountById(payload.id);
    

    return response;
  } catch (error) {
    console.log(`UserService -> updateUser -> error -> ${JSON.stringify(error)}`);
    throw error;
  }
};

const getUserById = async payload => {
  try {
    const user = await UserRepository.getById(payload.id);
    if (!user) {
      throw new RequestError(USER_NOT_FOUND, NOT_FOUND_CODE, NOT_FOUND_SCOPE);
    }

    return user;
  } catch (error) {
    console.log(`UserService -> getUserById -> error -> ${JSON.stringify(error)}`);
    throw error;
  }
};

const createPhotoURL = async payload => {
  try {
    const user = await UserRepository.getById(payload.id);
    // rollback photo s3
    if (!user) {
      throw new RequestError(USER_NOT_FOUND, NOT_FOUND_CODE, NOT_FOUND_SCOPE);
    }

    const response = await UserRepository.appendToList(payload.id, 'photos', payload.url);
    console.log(response);
    return user;
  } catch (error) {
    console.log(`UserService -> getUserById -> error -> ${JSON.stringify(error)}`);
    throw error;
  }
};
module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  createPhotoURL
};