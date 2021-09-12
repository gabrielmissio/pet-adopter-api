
class BaseRepository {
  constructor(entity, tableName) {
    this.entity = entity;
    this.tableName = tableName;
  }

  async getById (id) {
    const { buildGetParams } = require('./../mapper/clientMapper');
    const { get } = require('./clientRepository');

    const params = {
      tableName: this.tableName,
      key: {
        'id': id
      }
    };

    const response = await get(buildGetParams(params));
    return response.Item;
  }
};

module.exports = BaseRepository;
