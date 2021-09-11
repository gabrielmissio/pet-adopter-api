const { serialize: userSerializer } = require('./userSerializer');

const serialize = ({ user, token }) => {
  return {
    user: userSerializer(user),
    token
  };
};

module.exports = {
  serialize
};