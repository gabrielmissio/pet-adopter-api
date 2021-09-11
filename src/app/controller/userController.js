const { httpCodesEnums: { OK } } = require('./../../helpers/enums');
const { formatError, getStatusCode } = require('./../../helpers/utlis');

const getUser = async(req, res) => {
  try {
    const response = {message: '/user GET'};// await singupService(req.body);

    return res.status(OK).json(response);
  } catch (error) {
    console.error(error);
    return res.status(getStatusCode(error)).json(formatError(error));
  }
};

const updateUser = async(req, res) => {
  try {
    const response = {message: `PUT /user/${req.params.id}`};// await singupService(req.body);

    return res.status(OK).json(response);
  } catch (error) {
    console.error(error);
    return res.status(getStatusCode(error)).json(formatError(error));
  }
};

const deleteUser = async(req, res) => {
  try {
    const response = {message: `DELETE /user/${req.params.id}`};// await singupService(req.body);

    return res.status(OK).json(response);
  } catch (error) {
    console.error(error);
    return res.status(getStatusCode(error)).json(formatError(error));
  }
};

const getUserById = async(req, res) => {
  try {
    const response = {message: `GET /user/${req.params.id}`};// await singupService(req.body);

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
