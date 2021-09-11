const { httpCodesEnums: { OK } } = require('./../../helpers/enums');
const { formatError, getStatusCode } = require('./../../helpers/utlis');
const {
  getUsers: getUsersService,
  updateUser: updateUserService,
  deleteUser: deleteUserService,
  getUserById: getUserByIdService
} = require('./../service/userService');

const getUser = async(req, res) => {
  try {
    const response = await getUsersService(req.query);

    return res.status(OK).json(response);
  } catch (error) {
    console.error(error);
    return res.status(getStatusCode(error)).json(formatError(error));
  }
};

const updateUser = async(req, res) => {
  try {
    const response = await updateUserService(req.body);

    return res.status(OK).json(response);
  } catch (error) {
    console.error(error);
    return res.status(getStatusCode(error)).json(formatError(error));
  }
};

const deleteUser = async(req, res) => {
  try {
    const response = await deleteUserService(req.body);

    return res.status(OK).json(response);
  } catch (error) {
    console.error(error);
    return res.status(getStatusCode(error)).json(formatError(error));
  }
};

const getUserById = async(req, res) => {
  try {
    const response = await getUserByIdService(req.body);

    return res.status(OK).json(response);
  } catch (error) {
    console.error(error);
    return res.status(getStatusCode(error)).json(formatError(error));
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  getUserById
};
