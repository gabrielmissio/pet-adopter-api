const {
  get,
  putItem,
  update,
  deepScan
} = require('./../../database');

class BaseRepository {
  constructor(entity, tableName) {
    this.entity = entity;
    this.tableName = tableName;
  }

  async getById(id) {
    const { buildGetParams } = require('./../mapper/clientMapper');

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

    const params = {
      tableName: this.tableName,
      item: payload
    };
  
    return putItem(buildPutItemsParams(params));
  }

  async changeAccountStatus(id, accountStatus) {
    const { buildUpdateParams } = require('./../mapper/clientMapper');
    
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

  async getByAccountStatus(status) {
    const { buildDeepScanParams } = require('./../mapper/clientMapper');

    const params = {
      tableName: this.tableName,
      filterExpression: 'accountStatus = :value',
      expressionAttributeValues: {
          ':value': status
      }
    };
  
    const response = await deepScan(buildDeepScanParams(params));
    return response.Items;
  }
};

module.exports = BaseRepository;
