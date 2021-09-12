const buildUpdatAccountStatusParams = payload => {
  return {
    tableName: payload.tableName,
    key: {
      'id': payload.id
    },
    updateExpression: 'set accountStatus = :value',
    expressionAttributeValues: {':value': payload.accountStatus}
  };
};

module.exports = {
  buildUpdatAccountStatusParams
};
