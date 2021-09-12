
class BaseRepository {
  constructor(entity, tableName) {
    this.entity = entity;
    this.tableName = tableName;
  }

  async getById(id) {
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

  async create(payload) {
    const { buildPutItemsParams } = require('./../mapper/clientMapper');
    const { putItem } = require('./clientRepository');

    const params = {
      tableName: this.tableName,
      item: payload
    };

    const response = await putItem(buildPutItemsParams(params));// TODO: validate response
    return response;
  }
};

module.exports = BaseRepository;
