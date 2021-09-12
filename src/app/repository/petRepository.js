const Pet = require('./../../models/pet');
const BaseRepository = require('./baseRepository');
const { PETS_TABLE_NAME } = require('./../../config');

class PetRepository extends BaseRepository {
  constructor() {
    super(Pet, PETS_TABLE_NAME); // call the super class constructor and pass in the name parameter
  }

}

module.exports = new PetRepository;
