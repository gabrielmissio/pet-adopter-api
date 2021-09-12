const BaseRepository = require('./baseRepository');

class MembersRepository extends BaseRepository {
  constructor(entity, tableName) {
    super(entity, tableName); // call the super class constructor and pass in the name parameter
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

module.exports = MembersRepository;
