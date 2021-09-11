const express = require('express');
const router = express.Router();

const {
  getUser,
  updateUser,
  deleteUser,
  getUserById
} = require('./../app/controller/userController');


router.get('/', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', getUserById);

module.exports = router;