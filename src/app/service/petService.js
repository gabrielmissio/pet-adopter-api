const { putItem } = require('./../repository/clientRepository');
const { mergeObjects } = require('./../../helpers/utlis')
const { RequestError } = require('./../../helpers/errors');
const {
  buildPutItemsParams,
  buildDeepScanParams,
  buildGetParams
} = require('./../mapper/clientMapper');
const {
  buildPetObject,
  buildCreatePetParams,
  buildGetPetsByStatusParams,
  buildGetPetByIdParams
} = require('./../mapper/petMapper');
const {
  deepScan,
  get
} = require('./../repository/clientRepository');

const {
  errorMessagesEnums: {
    PET_NOT_FOUND
  },
  errorScopesEnums: {
    NOT_FOUND: NOT_FOUND_SCOPE,
  },
  httpCodesEnums: {
    NOT_FOUND: NOT_FOUND_CODE,
  }
} = require('./../../helpers/enums');


const createPet = async payload => {
  try {
    payload.accountStatus = 'active';
    const pet = buildPetObject(payload);
    const params = buildCreatePetParams(pet);
    await putItem(buildPutItemsParams(params));// TODO: validate response

    return pet;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPet = async payload => {
  try {
    const pets = await getPetsByStatus(payload.accountStatus);

    return pets;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updatePet = async(id, payload) => {
  try {
    const petToUpdate = await getPetByIdHandler(id);
    if (!petToUpdate) {
      throw new RequestError(PET_NOT_FOUND, NOT_FOUND_CODE, NOT_FOUND_SCOPE);
    }

    payload.id = id;
    payload.createdAt = petToUpdate.createdAt;
    payload.matches = petToUpdate.matches;

    const mergedObject = mergeObjects(petToUpdate, payload);
    await createPet(mergedObject);// TODO: validate response

    return mergedObject;    
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deletePet = async id => {
  try {
    const petToUpdate = await getPetByIdHandler(id);
    if (!petToUpdate) {
      throw new RequestError(PET_NOT_FOUND, NOT_FOUND_CODE, NOT_FOUND_SCOPE);
    }

    const response = {message: `DELETE /pet/${id}`};// await singupService(req.body);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPetById = async id => {
  try {
    const pet = await getPetByIdHandler(id);
    if (!pet) {
      throw new RequestError(PET_NOT_FOUND, NOT_FOUND_CODE, NOT_FOUND_SCOPE);
    }

    return pet;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPetsByStatus = async status => {
  try {
    const params = buildGetPetsByStatusParams(status);
    const response = await deepScan(buildDeepScanParams(params));

    return response.Items;
  } catch (error) {
    console.log('AuthService -> getUserByEmail -> error -> ', error);
    throw error;
  }
};

const getPetByIdHandler = async payload => {
  try {
    const params = buildGetPetByIdParams(payload);
    const response = await get(buildGetParams(params));

    return response.Item;
  } catch (error) {
    console.log('AuthService -> getUserByEmail -> error -> ', error);
    throw error;
  }
};

module.exports = {
  createPet,
  getPet,
  updatePet,
  deletePet,
  getPetById
};
