const serialize = ({ type, value }) => {
  return {
    type,
    value
  };
};
  
const serializeList =  phones => phones.map(phone => serialize(phone));

module.exports = {
  serialize,
  serializeList
};