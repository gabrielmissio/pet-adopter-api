const express = require('express');
const router = express.Router();

const {
  createPet,
  getPet,
  updatePet,
  deletePet,
  getPetById
} = require('./../app/controller/petController');


router.post('/', createPet);
router.get('/', getPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);
router.get('/:id', getPetById);

module.exports = router;