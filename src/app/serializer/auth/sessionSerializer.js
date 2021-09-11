const { serialize: authUserSerializer } = require('./authUserSerializer');

const serialize = ({ user, token }) => {
  return {
    user: authUserSerializer(user),
    token
  };
};

module.exports = {
  serialize
};