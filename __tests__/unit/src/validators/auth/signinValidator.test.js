describe('Given the signin validator', () => {
  describe('And the input is valid', () => {
    it('Then I expect the error to be undefined', () => {
      const schema = require('./../../../../../src/validators/auth/signinValidator');
      const validInput = {
        email: 'user@domain.com',
        password: 'Passw0rd!'
      }

      const { error } = schema.validate(validInput);

      expect(error).toBeUndefined();
    });
  });

  describe('And the input is invalid', () => {
    it('Then I expect the error details to be greater than or equal to 1', () => {
      const schema = require('./../../../../../src/validators/auth/signinValidator');
      const validInput = {
        email: 'user@domain',
        password: 'Passw0rd!'
      }

      const { error } = schema.validate(validInput);

      expect(error.details.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('And the input parameter email is a invalid email', () => {
    it('Then I expect the error message to be "email" must be a valid email', () => {
      const schema = require('./../../../../../src/validators/auth/signinValidator');
      const validInput = {
        email: 'user@domain',
        password: 'Passw0rd!'
      }

      const { error } = schema.validate(validInput);

      expect(error.message).toBe('"email" must be a valid email');
    });
  });

});

