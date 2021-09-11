const jwt = require('jsonwebtoken');
const { SECRET } = require('./../config');
const { httpCodesEnums: {UNAUTHORIZED} } = require('./../helpers/enums');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(UNAUTHORIZED).json({ error: 'The authorization header is required' });// TODO: get message from enum module
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(UNAUTHORIZED).json({ error: 'Token malformatted' });// TODO: get message from enum module
  }

  const [ schema, token ] = parts;
  if (schema !== 'Bearer') {
    return res.status(UNAUTHORIZED).json({ error: 'Token malformatted' });// TODO: get message from enum module
  }

  jwt.verify(token, SECRET, (err, data) => {
    if (err) {
      return res.status(UNAUTHORIZED).json({ error: 'Invalid token' });// TODO: get message from enum module
    }

    req.userId = data.id;
    return next();
  });

};
