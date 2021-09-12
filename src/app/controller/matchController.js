const { httpCodesEnums: { OK, CREATED } } = require('./../../helpers/enums');
const { formatError, getStatusCode } = require('./../../helpers/utlis');
const {
  createMatch: createMatchService,
  checkMatch: checkMatchService
} = require('./../service/matchService');
const createMatch = async(req, res) => {
  try {
    const response = await createMatchService(req.body);

    return res.status(CREATED).json(response);
  } catch (error) {
    console.error(error);
    return res.status(getStatusCode(error)).json(formatError(error));
  }
};

const checkMatch = async(req, res) => {
  try {
    const response = await checkMatchService(req.body);

    return res.status(OK).json(response);
  } catch (error) {
    console.error(error);
    return res.status(getStatusCode(error)).json(formatError(error));
  }
};

module.exports = {
  createMatch,
  checkMatch
};
