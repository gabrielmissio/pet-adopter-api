const { httpCodesEnums: { OK } } = require('./../../helpers/enums');
const {
  getUsers: getUsersService,
  updateUser: updateUserService,
  deleteUser: deleteUserService,
  getUserById: getUserByIdService
} = require('./../service/userService');
const {
  serialize: userSerialize,
  serializeList: userSerializeList
} = require('./../serializer/user/userSerializer');

const BaseController = require('./baseController');

class AuthController extends BaseController {
  constructor() {
  }

  static async getUser(req, res) {
    super.base(
      {
        req: req,
        res: res,
        handler: getUsersService,
        httpCode: OK,
        type: 'query',
        serializer: userSerializeList
      }
    )
  }

  static async updateUser(req, res) {
    req.body.id = req.params.id;
    super.base(
      {
        req: req,
        res: res,
        handler: updateUserService,
        httpCode: OK,
        type: 'body',
        serializer: userSerialize
      }
    )
  }

  static async deleteUser(req, res) {
    super.base(
      {
        req: req,
        res: res,
        handler: deleteUserService,
        httpCode: OK,
        type: 'params',
        serializer: null
      }
    )
  }

  static async getUserById(req, res) {
    super.base(
      {
        req: req,
        res: res,
        handler: getUserByIdService,
        httpCode: OK,
        type: 'params',
        serializer: userSerialize
      }
    )
  }
}

module.exports = AuthController;
