const serialize = ({ _id, name, email, createdAt }) => {
    return {
      _id,
      name,
      email,
      createdAt
    };
  };
    
  module.exports = {
    serialize
  };