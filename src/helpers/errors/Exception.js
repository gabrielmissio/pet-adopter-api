class Exception {
  constructor(definition) {
    this.definition = definition;
    this.date = new Date();
    this.isArray = (definition || {}).constructor === Array;
  }

  static generateCustomError(errorDefinition) {
    const mergeDef = def => ({
      ...def
    });

    const native = new Error();
    if ((errorDefinition || {}).constructor === Array) {
      return errorDefinition.map(def => mergeDef(def, native.stack));
    }
    return mergeDef(errorDefinition, native.stack);
  }

  static raise(errorDefinition) {
    return Exception.generateCustomError(errorDefinition);
  }
}

module.exports = Exception;
