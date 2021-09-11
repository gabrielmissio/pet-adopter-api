const serialize = ({ value }) => {
  return {
    value
  };
};
  
const serializeList =  matches => matches.map(match => serialize(match));

module.exports = {
  serialize,
  serializeList
};