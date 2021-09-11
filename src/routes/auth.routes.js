
const express = require('express');
const router = express.Router();

const { singup, singin } = require('./../app/controller/authController');
const validatiorMiddleware = require('./../middlewares/validatiorMiddleware');
const { signinValidatorSchema, signupValidatorSchema } = require('./../validators/auth');

router.post('/signin', validatiorMiddleware(signinValidatorSchema, 'body'), singin);
router.post('/signup', validatiorMiddleware(signupValidatorSchema, 'body'), singup);
// TODO: add endpoint /forgot-password

module.exports = router;
