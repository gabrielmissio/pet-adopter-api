const db = require('./../../database');
class BaseRepository {
  constructor(entity, tableName) {
    this.entity = entity;
    this.tableName = tableName;
    this.db = db;
  }

  async getById(id) {
    const params = {
      tableName: this.tableName,
      key: {
        'id': id
      }
    };

    const response = await this.db.get(params);
    return response.Item;
  }

  async create(payload) {
    const params = {
      tableName: this.tableName,
      item: payload
    };
  
    return this.db.putItem(params);
  }
};

module.exports = BaseRepository;
