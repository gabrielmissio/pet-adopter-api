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

  async changeAccountStatus(id, accountStatus) {    
    const params = {
      tableName: this.tableName,
      key: {
        'id': id
      },
      updateExpression: 'set accountStatus = :value',
      expressionAttributeValues: {':value': accountStatus}
    };

    return this.db.update(params);
  }

  async disableAccountById(id) {
    return this.changeAccountStatus(id, 'inactive');
  }

  async enableAccountById(id) {
    return this.changeAccountStatus(id, 'inactive');
  }

  async getByAccountStatus(status) {

    const params = {
      tableName: this.tableName,
      filterExpression: 'accountStatus = :value',
      expressionAttributeValues: {
          ':value': status
      }
    };
  
    const response = await this.db.deepScan(params);
    return response.Items;
  }
};

module.exports = BaseRepository;
