const { serializeList: addreddSerializerList } = require('./addressSerializer');
const { serializeList: adoptionSerializerList } = require('./adoptionSerializer');
const { serializeList: phoneSerializerList } = require('./phoneSerializer');
const { serializeList: matchSerializerList } = require('./matchSerializer');

const serialize = ({ updatedAt, accountStatus, addresses, phones, matches, adoptions }) => {
  return {
    accountStatus,
    updatedAt,
    addresses: addreddSerializerList(addresses),
    phones: phoneSerializerList(phones),
    matches: matchSerializerList(matches),
    adoptions: adoptionSerializerList(adoptions)
  };
};

module.exports = {
  serialize
};
