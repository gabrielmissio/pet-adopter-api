const db = require('./../../database');
class BaseRepository {
  constructor(entity, tableName) {
    this.entity = entity;
    this.tableName = tableName;
    this.db = db;
  }

  async getById(id) {
    const { buildGetParams } = require('./../mapper/clientMapper');

    const params = {
      tableName: this.tableName,
      key: {
        'id': id
      }
    };

    const response = await this.db.get(buildGetParams(params));
    return response.Item;
  }

  async create(payload) {
    const { buildPutItemsParams } = require('./../mapper/clientMapper');

    const params = {
      tableName: this.tableName,
      item: payload
    };
  
    return this.db.putItem(buildPutItemsParams(params));
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

    return this.db.update(buildUpdateParams(params));
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
  
    const response = await this.db.deepScan(buildDeepScanParams(params));
    return response.Items;
  }
};

module.exports = BaseRepository;
