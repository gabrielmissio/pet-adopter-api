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
  
module.exports = {
  serialize
};