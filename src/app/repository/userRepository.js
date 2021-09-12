const User = require('./../../models/user');
const BaseRepository = require('./baseRepository');
const { USERS_TABLE_NAME } = require('./../../config');

class UserRepository extends BaseRepository {
  constructor() {
    super(User, USERS_TABLE_NAME); // call the super class constructor and pass in the name parameter
  }

}

module.exports = new UserRepository;
