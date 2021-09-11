const AWS = require('aws-sdk');
const region = 'us-east-1';

const DYNAMODB_CLIENT = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  region
});

const USERS_TABLE_NAME = process.env.USERS_TABLE_NAME;
const PETS_TABLE_NAME = process.env.PETS_TABLE_NAME;
const SECRET = process.env.SECRET;

module.exports = {
  DYNAMODB_CLIENT,
  USERS_TABLE_NAME,
  PETS_TABLE_NAME,
  SECRET
};
