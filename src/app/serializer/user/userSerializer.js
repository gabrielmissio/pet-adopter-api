const { serialize: infoSerializer } = require('./infoSerializer');

const serialize = ({ id, name, email, createdAt, info }) => {
  return {
    id,
    name,
    email,
    createdAt,
    info: infoSerializer(info)
  };
};

const serializeList =  users => users.map(user => serialize(user));

module.exports = {
  serialize,
  serializeList
};