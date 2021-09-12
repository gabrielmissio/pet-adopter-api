
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
  
    return putItem(buildPutItemsParams(params));
  }

  async changeAccountStatus(id, accountStatus) {
    const { buildUpdateParams } = require('./../mapper/clientMapper');
    const { update } = require('./clientRepository');
    
    const params = {
      tableName: this.tableName,
      key: {
        'id': id
      },
      updateExpression: 'set accountStatus = :value',
      expressionAttributeValues: {':value': accountStatus}
    };

    return update(buildUpdateParams(params));
  }

  async disableAccountById(id) {
    return this.changeAccountStatus(id, 'inactive');
  }

  async enableAccountById(id) {
    return this.changeAccountStatus(id, 'inactive');
  }
};

module.exports = BaseRepository;
