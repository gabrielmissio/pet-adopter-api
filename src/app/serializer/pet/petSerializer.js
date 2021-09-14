const { serializeList: matchSerializerList } = require('./matchSerializer');
const { serializeList: photoSerializerList } = require('./photoSerializer');

const serialize = ({
  id,
  specie,
  breed,
  name,
  size,
  estimatedAge,
  estimatedLongevity,
  accountStatus,
  photos,
  adoption,
  createdAt,
  updatedAt,
  matches
}) => {
  return {
    id,
    specie,
    breed,
    name,
    size,
    estimatedAge,
    estimatedLongevity,
    accountStatus,
    photos: photoSerializerList(photos || []),
    adoption,
    createdAt,
    updatedAt,
    matches: matchSerializerList(matches || [])
  };
};

const serializeList =  pets => pets.map(pet => serialize(pet));

module.exports = {
  serialize,
  serializeList
};