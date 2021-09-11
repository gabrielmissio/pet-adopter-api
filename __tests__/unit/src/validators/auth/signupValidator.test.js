describe('Given the signup validator', () => {
  describe('And the input is valid', () => {
    it('Then I expect the error to be undefined', () => {
      const schema = require('./../../../../../src/validators/auth/signupValidator');
      const validInput = {
        name: 'Mike Peralta',
        email: 'user@domain.com',
        password: 'Passw0rd!'
      }

      const { error } = schema.validate(validInput);

      expect(error).toBeUndefined();
    });
  });

  describe('And the input is invalid', () => {
    it('Then I expect the error details to be greater than or equal to 1', () => {
      const schema = require('./../../../../../src/validators/auth/signupValidator');
      const validInput = {
        email: 'user@domain',
        password: 'Passw0rd!'
      }

      const { error } = schema.validate(validInput);

      expect(error.details.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('And the input does not contain the name parameter', () => {
    it('Then I expect the error message to be "name" is required', () => {
      const schema = require('./../../../../../src/validators/auth/signupValidator');
      const validInput = {
        email: 'user@domain',
        password: 'Passw0rd!'
      }

      const { error } = schema.validate(validInput);

      expect(error.message).toBe('"name" is required');
    });
  });

});

