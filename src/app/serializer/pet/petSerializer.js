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
  description,
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
    description,
    adoption,
    createdAt,
    updatedAt,
    photos: photoSerializerList(photos || []),
    matches: matchSerializerList(matches || [])
  };
};

const serializeList =  pets => pets.map(pet => serialize(pet));

module.exports = {
  serialize,
  serializeList
};