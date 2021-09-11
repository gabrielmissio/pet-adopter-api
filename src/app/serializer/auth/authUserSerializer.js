const serialize = ({ id, name, email, createdAt, accountStatus }) => {
  return {
    id,
    name,
    email,
    accountStatus,
    createdAt
  };
};
  
module.exports = {
  serialize
};