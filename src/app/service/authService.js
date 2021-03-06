const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SECRET } = require('./../../config');// TODO: get secret from parameter store
const { isAccountActive } = require('./../../helpers/utlis');
const { RequestError } = require('./../../helpers/errors');

const User = require('./../../models/user');
const UserRepository = require('./../repository/userRepository');

const {
  errorMessagesEnums: {
    USER_ALREADY_EXISTS,
    USER_NOT_FOUND,
    INVALID_CREDENTIALS,
    USER_WITH_INACTIVE_ACCOUNT
  },
  errorScopesEnums: {
    INVALID_CREDENTIALS: INVALID_CREDENTIALS_SCOPE,
    NOT_FOUND: NOT_FOUND_SCOPE,
    CONFLICT: CONFLICT_SCOPE,
    INACTIVE_ACCOUNT: INACTIVE_ACCOUNT_SCOPE
  },
  httpCodesEnums: {
    CONFLICT: CONFLICT_CODE,
    BAD_REQUEST: BAD_REQUEST_CODE,
    NOT_FOUND: NOT_FOUND_CODE,
    UNAUTHORIZED: UNAUTHORIZED_CODE
  }
} = require('./../../helpers/enums');

const singup = async payload => {
  try {
    const existingUser = await UserRepository.getUserByEmail(payload.email);
    
    if (existingUser) {
      throw new RequestError(USER_ALREADY_EXISTS, CONFLICT_CODE, CONFLICT_SCOPE);
    }

    const user = new User(payload);
    user.password = await bcrypt.hash(user.password, 10);
    user.accountStatus = 'active';
    // const response =  await putItem(buildPutItemsParams(buildCreateUserParams(user)));
    await UserRepository.create(user);
    // validate response

    const token = generateToken({ id: user.id });

    return { user, token };
  } catch (error) {
    console.error('AuthService -> singup -> error -> ', error);
    throw error;
  }
};

const singin = async payload => {
  try {
    const user = await UserRepository.getUserByEmail(payload.email);
    
    if (!user) {
      throw new RequestError(USER_NOT_FOUND, NOT_FOUND_CODE, NOT_FOUND_SCOPE);
    }

    if (!isAccountActive(user)) {
      throw new RequestError(USER_WITH_INACTIVE_ACCOUNT, UNAUTHORIZED_CODE, INACTIVE_ACCOUNT_SCOPE);
    }

    const isPasswordValid = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordValid) {
      throw new RequestError(INVALID_CREDENTIALS, BAD_REQUEST_CODE, INVALID_CREDENTIALS_SCOPE);
    }

    const token = generateToken({ id: user.id });

    return { user, token };
  } catch (error) {
    console.error('AuthService -> singin -> error -> ', error);
    throw error;
  }
};

const generateToken = params => {
  const ONE_DAY_IN_SECONDS = 86400;
  return jwt.sign(params, SECRET, {
    expiresIn: ONE_DAY_IN_SECONDS
  });
};

module.exports = {
  singup,
  singin
};
