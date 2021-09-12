const Pet = require('./../../models/pet');
const MembersRepository = require('./membersRepository');
const { PETS_TABLE_NAME } = require('./../../config');

class PetRepository extends MembersRepository {
  constructor() {
    super(Pet, PETS_TABLE_NAME); // call the super class constructor and pass in the name parameter
  }

}

module.exports = new PetRepository;
