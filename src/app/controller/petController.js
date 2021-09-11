const { httpCodesEnums: { OK, CREATED } } = require('./../../helpers/enums');
const { formatError, getStatusCode } = require('./../../helpers/utlis');
const { 
  serialize: petSerialize,
  serializeList: petSerializeList
} = require('./../serializer/pet/petSerializer');
const {
  createPet: createPetService,
  getPet: getPetService,
  updatePet: updatePetService,
  deletePet: deletePetService,
  getPetById: getPetByIdService
} = require('./../service/petService');

const createPet = async(req, res) => {
  try {
    const response = await createPetService(req.body);

    return res.status(CREATED).json(petSerialize(response));
  } catch (error) {
    console.error(error);
    return res.status(getStatusCode(error)).json(formatError(error));
  }
};

const getPet = async(req, res) => {
  try {
    const response = await getPetService(req.query);

    return res.status(OK).json(petSerializeList(response));
  } catch (error) {
    console.error(error);
    return res.status(getStatusCode(error)).json(formatError(error));
  }
};

const updatePet = async(req, res) => {
  try {
    const response = await updatePetService(req.params.id, req.body);

    return res.status(OK).json(response);
  } catch (error) {
    console.error(error);
    return res.status(getStatusCode(error)).json(formatError(error));
  }
};

const deletePet = async(req, res) => {
  try {
    const response = await deletePetService(req.params.id);

    return res.status(OK).json(response);
  } catch (error) {
    console.error(error);
    return res.status(getStatusCode(error)).json(formatError(error));
  }
};

const getPetById = async(req, res) => {
  try {
    const response = await getPetByIdService(req.params.id);

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
