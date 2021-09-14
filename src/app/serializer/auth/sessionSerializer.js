const { serialize: authUserSerializer } = require('./../user/userSerializer');

const serialize = ({ user, token }) => {
  return {
    user: authUserSerializer(user),
    token
  };
};

module.exports = {
  serialize
};