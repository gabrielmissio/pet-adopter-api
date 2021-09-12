const { mergeObjects } = require('./../../helpers/utlis')
const { RequestError } = require('./../../helpers/errors');
const { isAccountActive } = require('./../../helpers/utlis');
const { putItem } = require('./../repository/clientRepository');
const {
  buildDeepScanParams,
  buildUpdateParams
} = require('./../mapper/clientMapper');
const {
  buildGetPetsByStatusParams,
  buildUpdatePetAccountStatusParams
} = require('./../mapper/petMapper');
const {
  deepScan,
  update
} = require('./../repository/clientRepository');
const Pet = require('./../../models/pet');

const {
  errorMessagesEnums: {
    PET_NOT_FOUND,
    PET_WITH_INACTIVE_ACCOUNT
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

const PetRepository = require('./../repository/petRepository');

const createPet = async payload => {
  try {
    payload.accountStatus = 'active';
    const pet = new Pet(payload);
    await PetRepository.create(pet);

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
    const petToUpdate = await PetRepository.getById(id);
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
    const petToUpdate = await PetRepository.getById(id);
    if (!petToUpdate) {
      throw new RequestError(PET_NOT_FOUND, NOT_FOUND_CODE, NOT_FOUND_SCOPE);
    }

    if (!isAccountActive(petToUpdate)) {
      throw new RequestError(PET_WITH_INACTIVE_ACCOUNT, UNAUTHORIZED_CODE, INACTIVE_ACCOUNT_SCOPE);
    }
    
    // TODO: add validate
    const response = await deletePetById(id);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPetById = async id => {
  try {
    const pet = await PetRepository.getById(id);
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

const deletePetById = async id => {
  try {
    const response = await PetRepository.disableAccountById(id);

    return response;// TODO: validate response
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
