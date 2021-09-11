const { serializeList: addreddSerializerList } = require('./addressSerializer');
const { serializeList: adoptionSerializerList } = require('./adoptionSerializer');
const { serializeList: phoneSerializerList } = require('./phoneSerializer');

const serialize = ({ updatedAt, addresses, phones, adoptions }) => {
  return {
    updatedAt,
    addresses: addreddSerializerList(addresses),
    phones: phoneSerializerList(phones),
    adoptions: adoptionSerializerList(adoptions || [])
  };
};
  
module.exports = {
  serialize
};