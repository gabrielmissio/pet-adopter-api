const BaseRepository = require('./baseRepository');

class MembersRepository extends BaseRepository {
  constructor(entity, tableName) {
    super(entity, tableName); // call the super class constructor and pass in the name parameter
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

module.exports = MembersRepository;
