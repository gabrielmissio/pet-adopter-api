const createMatch = async payload => {
  try {
    console.log(payload);

    return { message: 'POST /match' }
  } catch (error) {
    console.log('MatchService -> createMatch -> error -> ', error);
    throw(error);
  }
};

const checkMatch = async payload => {
  try {
    console.log(payload);

    return { message: 'POST /match/check' }
  } catch (error) {
    console.log('MatchService -> checkMatch -> error -> ', error);
    throw(error);
  }
};

module.exports = {
  createMatch,
  checkMatch
};
