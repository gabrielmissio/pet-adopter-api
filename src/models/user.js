const { v4: uuid } = require('uuid');

class User {
  constructor(payload) {
    this.id = payload.id || uuid(),
    this.name = payload.name,
    this.email = payload.email,
    this.password = payload.password,
    this.accountStatus = payload.accountStatus,
    this.description = payload.description,
    this.createdAt = payload.createdAt || Date.now(),
    this.updatedAt = Date.now(),
    this.addresses = payload.addresses || [],
    this.photos = payload.photos || [],
    this.matches = payload.matches || [],
    this.phones = payload.phones || [],
    this.adoptions = payload.adoptions || []
  }
};

module.exports = User;