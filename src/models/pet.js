const { v4: uuid } = require('uuid');

class Pet {
  constructor(payload) {
    this.id = payload.id || uuid(),
    this.specie = payload.specie,
    this.breed = payload.breed,
    this.name = payload.name,
    this.size = payload.size,
    this.estimatedAge = payload.estimatedAge,
    this.estimatedLongevity = payload.estimatedLongevity,
    this.accountStatus = payload.accountStatus,
    this.photos = payload.photos || [],
    this.adoption = payload.adoption || {},
    this.createdAt = payload.createdAt || Date.now(),
    this.updatedAt = Date.now(),
    this.matches = payload.matches || []
  }
}

module.exports = Pet;
