
const { Exception } = require('./errors');

const getStatusCode = error => {
  if (error.errors) {
    return error.errors.statusCode || 500;
  }
  return error.statusCode || 500;
};

const formatError = error => {
  if (error.errors) {
    return Exception.raise({
      errors: {
        description: error.errors.description,
        message: error.errors.message,
        error: error.errors.error
      }
    });
  }
  return Exception.raise({
    errors: {
      description: error.description || 'INTERNAL_SERVER_ERROR',
      message: error.message || 'INTERNAL_SERVER_ERROR',
      error: error.error || 'INTERNAL_SERVER_ERROR'
    }
  });
};

const deepScan = async(DYNAMODB_CLIENT, params, earlyStopCondition = () => false) => {
  let result = [];
  let items = [];
  let ExclusiveStartKey = null;
  do {
    params.ExclusiveStartKey = ExclusiveStartKey;
    const requestResponse = await DYNAMODB_CLIENT.scan(params).promise();

    if (getDynamodbResponseError(requestResponse)) {
      throw Error(requestResponse.$response.error);
    }

    items = [...items, ...requestResponse.Items];
    result = requestResponse;
    result.Items = items;

    ExclusiveStartKey = earlyStopCondition(result) ? null : requestResponse.LastEvaluatedKey;
  } while (ExclusiveStartKey);

  return result;
};

const getDynamodbResponseError = requestResponse => requestResponse && requestResponse.$response && requestResponse.$response.error;

const buildResponseMessage = message => ({ message });

const isUserIsActive = user => user.accountStatus && user.accountStatus === 'active';// TODO: replace 'active' to active status enum

const mergeObjects = (baseObject, toReplaceObject) => Object.assign({}, baseObject, toReplaceObject);

module.exports = {
  deepScan,
  getDynamodbResponseError,
  buildResponseMessage,
  getStatusCode,
  formatError,
  isUserIsActive,
  mergeObjects
};
