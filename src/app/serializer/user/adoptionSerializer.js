const serialize = ({ value }) => {
  return {
    value
  };
};
  
const serializeList =  adoptions => adoptions.map(adoption => serialize(adoption));

module.exports = {
  serialize,
  serializeList
};