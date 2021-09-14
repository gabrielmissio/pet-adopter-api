const { mergeObjects } = require('./../../helpers/utlis')
const { RequestError } = require('./../../helpers/errors');
const { isAccountActive } = require('./../../helpers/utlis');
const Pet = require('./../../models/pet');
const PetRepository = require('./../repository/petRepository');

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
    const pets = await PetRepository.getByAccountStatus(payload.accountStatus);

    return pets;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updatePet = async(payload) => {
  try {
    const petToUpdate = await PetRepository.getById(payload.id);
    if (!petToUpdate) {
      throw new RequestError(PET_NOT_FOUND, NOT_FOUND_CODE, NOT_FOUND_SCOPE);
    }
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

const deletePet = async payload => {
  try {
    const petToUpdate = await PetRepository.getById(payload.id);
    if (!petToUpdate) {
      throw new RequestError(PET_NOT_FOUND, NOT_FOUND_CODE, NOT_FOUND_SCOPE);
    }

    if (!isAccountActive(petToUpdate)) {
      throw new RequestError(PET_WITH_INACTIVE_ACCOUNT, UNAUTHORIZED_CODE, INACTIVE_ACCOUNT_SCOPE);
    }
    
    // TODO: add validate
    const response = await PetRepository.disableAccountById(payload.id);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPetById = async payload => {
  try {
    const pet = await PetRepository.getById(payload.id);
    if (!pet) {
      throw new RequestError(PET_NOT_FOUND, NOT_FOUND_CODE, NOT_FOUND_SCOPE);
    }

    return pet;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createPhotoURL = async payload => {
  try {
    const pet = await PetRepository.getById(payload.id);
    // rollback photo s3
    if (!pet) {
      throw new RequestError(PET_NOT_FOUND, NOT_FOUND_CODE, NOT_FOUND_SCOPE);
    }

    const response = await PetRepository.appendToList(payload.id, 'photos', payload.url);
    console.log(response);
    return pet;
  } catch (error) {
    console.log(`UserService -> createPhotoURL -> error -> ${JSON.stringify(error)}`);
    throw error;
  }
};

module.exports = {
  createPet,
  getPet,
  updatePet,
  deletePet,
  getPetById,
  createPhotoURL
};
