const { putItem } = require('./../repository/clientRepository');
const {
  buildPutItemsParams,
  buildDeepScanParams
} = require('./../mapper/clientMapper');
const {
  buildPetObject,
  buildCreatePetParams,
  buildGetPetsByStatusParams
} = require('./../mapper/petMapper');
const {
  deepScan
} = require('./../repository/clientRepository');
const createPet = async payload => {
  try {
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
    const response = {message: `PUT /pet/${id}`};// await singupService(req.body);
    console.log(payload);
    
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deletePet = async id => {
  try {
    const response = {message: `DELETE /pet/${id}`};// await singupService(req.body);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPetById = async id => {
  try {
    const response = {message: `GET /pet/${id}`};// await singupService(req.body);

    return response;
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

module.exports = {
  createPet,
  getPet,
  updatePet,
  deletePet,
  getPetById
};
