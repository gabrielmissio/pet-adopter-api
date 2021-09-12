const User = require('./../../models/user');
const BaseRepository = require('./baseRepository');
const { USERS_TABLE_NAME } = require('./../../config');

class UserRepository extends BaseRepository {
  constructor() {
    super(User, USERS_TABLE_NAME); // call the super class constructor and pass in the name parameter
  }

  async getUserByEmail(email) {
    const { buildQueryParams } = require('./../mapper/clientMapper');
    const { query } = require('./clientRepository');

    const params = {
      tableName: USERS_TABLE_NAME,
      indexName: 'emailIndex',
      keyConditionExpression: 'email = :email',
      expressionAttributeValues: {
        ':email': email
      },
      Limit: 1
    };

    const response = await query(buildQueryParams(params));
    return response.Items[0];
  }

}

module.exports = new UserRepository;
