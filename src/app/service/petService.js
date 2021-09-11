const createPet = async payload => {
  try {
    const response = {message: '/pet POST'};// await singupService(req.body);
    console.log(payload);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPet = async payload => {
  try {
    const response = {message: '/pet GET'};// await singupService(req.body);
    console.log(payload);
    
    return response;
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

module.exports = {
  createPet,
  getPet,
  updatePet,
  deletePet,
  getPetById
};
