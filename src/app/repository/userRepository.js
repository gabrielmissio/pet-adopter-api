const User = require('./../../models/user');
const MembersRepository = require('./membersRepository');
const { USERS_TABLE_NAME } = require('./../../config');

class UserRepository extends MembersRepository {
  constructor() {
    super(User, USERS_TABLE_NAME); // call the super class constructor and pass in the name parameter
  }

  async getUserByEmail(email) {
    const params = {
      tableName: USERS_TABLE_NAME,
      indexName: 'emailIndex',
      keyConditionExpression: 'email = :email',
      expressionAttributeValues: {
        ':email': email
      },
      Limit: 1
    };

    const response = await this.db.query(params);
    return response.Items[0];
  }

}

module.exports = new UserRepository;
