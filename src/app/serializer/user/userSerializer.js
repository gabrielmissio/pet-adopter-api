const { serializeList: addreddSerializerList } = require('./addressSerializer');
const { serializeList: adoptionSerializerList } = require('./adoptionSerializer');
const { serializeList: phoneSerializerList } = require('./phoneSerializer');
const { serializeList: matchSerializerList } = require('./matchSerializer');

const serialize = ({
  id,
  name,
  email,
  accountStatus,
  createdAt,
  updatedAt,
  addresses,
  phones,
  adoptions,
  matches
  
  
}) => {
  return {
    id,
    name,
    email,
    accountStatus,
    createdAt,
    updatedAt,
    addresses: addreddSerializerList(addresses || []),
    phones: phoneSerializerList(phones || []),
    adoptions: adoptionSerializerList(adoptions || []),
    matches: matchSerializerList(matches || [])
  };
};

const serializeList =  users => users.map(user => serialize(user));

module.exports = {
  serialize,
  serializeList
};
