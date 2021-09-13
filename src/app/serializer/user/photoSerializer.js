const serialize = (url) => {
  return {
    url
  };
};
  
const serializeList =  matches => matches.map(match => serialize(match));

module.exports = {
  serialize,
  serializeList
};