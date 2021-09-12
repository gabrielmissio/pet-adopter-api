
const express = require('express');
const router = express.Router();

const {
  createMatch,
  checkMatch
} = require('./../app/controller/matchController');

router.post('/', createMatch);
router.post('/check', checkMatch);

module.exports = router;
