const { httpCodesEnums: { OK, CREATED } } = require('./../../helpers/enums');
const { 
  serialize: petSerialize,
  serializeList: petSerializeList
} = require('./../serializer/pet/petSerializer');
const {
  createPet: createPetService,
  getPet: getPetService,
  updatePet: updatePetService,
  deletePet: deletePetService,
  getPetById: getPetByIdService
} = require('./../service/petService');
const BaseController = require('./baseController');

class PetController extends BaseController {
  constructor() {
  }

  static async createPet(req, res) {
    super.base(
      {
        req: req,
        res: res,
        handler: createPetService,
        httpCode: CREATED,
        type: 'body',
        serializer: petSerialize
      }
    )
  }

  static async getPet(req, res) {
    super.base(
      {
        req: req,
        res: res,
        handler: getPetService,
        httpCode: OK,
        type: 'query',
        serializer: petSerializeList
      }
    )
  }

  static async updatePet(req, res) {
    req.body.id = req.params.id;
    super.base(
      {
        req: req,
        res: res,
        handler: updatePetService,
        httpCode: OK,
        type: 'body',
        serializer: petSerialize
      }
    )
  }

  static async deletePet(req, res) {
    super.base(
      {
        req: req,
        res: res,
        handler: deletePetService,
        httpCode: OK,
        type: 'params',
        serializer: null
      }
    )
  }

  static async getPetById(req, res) {
    super.base(
      {
        req: req,
        res: res,
        handler: getPetByIdService,
        httpCode: OK,
        type: 'params',
        serializer: petSerialize
      }
    )
  }

}

module.exports = PetController;
