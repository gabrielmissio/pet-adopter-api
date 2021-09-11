const getUsers = async payload => {
  try {
    console.log(payload);
    return { message: `GET /user` };
  } catch (error) {
    console.log(`UserService -> updateUser -> error -> ${JSON.stringify(error)}`);
    throw error;
  }
};

const updateUser = async payload => {
  try {
    console.log(payload);
    return { message: `PUT /user/${payload.id}` };
  } catch (error) {
    console.log(`UserService -> updateUser -> error -> ${JSON.stringify(error)}`);
    throw error;
  }
};

const deleteUser = async payload => {
  try {
    console.log(payload);
    return { message: `DELETE /user/${payload.id}` };
  } catch (error) {
    console.log(`UserService -> updateUser -> error -> ${JSON.stringify(error)}`);
    throw error;
  }
};

const getUserById = async payload => {
  try {
    console.log(payload);
    return { message: `GET /user/${payload.id}` };
  } catch (error) {
    console.log(`UserService -> updateUser -> error -> ${JSON.stringify(error)}`);
    throw error;
  }
};

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  getUserById
};