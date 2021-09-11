const { httpCodesEnums: { OK, CREATED } } = require('./../../helpers/enums');
const { formatError, getStatusCode } = require('./../../helpers/utlis');

const createPet = async(req, res) => {
  try {
    const response = {message: '/pet POST'};// await singupService(req.body);

    return res.status(CREATED).json(response);
  } catch (error) {
    console.error(error);
    return res.status(getStatusCode(error)).json(formatError(error));
  }
};

const getPet = async(req, res) => {
  try {
    const response = {message: '/pet GET'};// await singupService(req.body);

    return res.status(OK).json(response);
  } catch (error) {
    console.error(error);
    return res.status(getStatusCode(error)).json(formatError(error));
  }
};

const updatePet = async(req, res) => {
  try {
    const response = {message: `PUT /pet/${req.params.id}`};// await singupService(req.body);

    return res.status(OK).json(response);
  } catch (error) {
    console.error(error);
    return res.status(getStatusCode(error)).json(formatError(error));
  }
};

const deletePet = async(req, res) => {
  try {
    const response = {message: `DELETE /pet/${req.params.id}`};// await singupService(req.body);

    return res.status(OK).json(response);
  } catch (error) {
    console.error(error);
    return res.status(getStatusCode(error)).json(formatError(error));
  }
};

const getPetById = async(req, res) => {
  try {
    const response = {message: `GET /pet/${req.params.id}`};// await singupService(req.body);

    return res.status(OK).json(response);
  } catch (error) {
    console.error(error);
    return res.status(getStatusCode(error)).json(formatError(error));
  }
};

module.exports = {
  createPet,
  getPet,
  updatePet,
  deletePet,
  getPetById
};
