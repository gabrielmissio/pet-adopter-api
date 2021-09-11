const { httpCodesEnums: { OK, CREATED } } = require('./../../helpers/enums');
const { singin: signinService, singup: singupService } = require('./../service/authService');
const { formatError, getStatusCode } = require('./../../helpers/utlis');
const { serialize: sessionSerialize } = require('./../serializer/auth/sessionSerializer');

const singup = async(req, res) => {
  try {
    const response = await singupService(req.body);

    return res.status(CREATED).json(sessionSerialize(response));
  } catch (error) {
    console.error(error);
    return res.status(getStatusCode(error)).json(formatError(error));
  }
};

const singin = async(req, res) => {
  try {
    const response = await signinService(req.body);

    return res.status(OK).json(sessionSerialize(response));
  } catch (error) {
    console.error(error);
    return res.status(getStatusCode(error)).json(formatError(error));
  }
};

module.exports = {
  singup,
  singin
};
