const serialize = ({ contry, state, city, street }) => {
  return {
    contry,
    state,
    city,
    street
  };
};
  
const serializeList =  addresses => addresses.map(address => serialize(address));

module.exports = {
  serialize,
  serializeList
};