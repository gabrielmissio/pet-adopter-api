const serialize = ({ id, name, email, createdAt }) => {
    return {
      id,
      name,
      email,
      createdAt
    };
  };
    
  module.exports = {
    serialize
  };