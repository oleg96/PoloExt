import inputValidate from './inputValidate.js';

describe('inputValidate test', () => {

  it('should check validate empty values', () => {
    expect(inputValidate({})).toEqual({
      email: 'Required',
      password: 'Required',
      text: 'Required',
      oldPassword: 'Required',
      newPassword: 'Required'
    });
  });

  it('should check validate correct values', () => {
    expect(inputValidate({
      email: 'and@gm.com',
      password: '123456789',
      text: 'test text',
      oldPassword: '123456789',
      newPassword: '123456789'
    })).toEqual({});
  });

  it('should check validate invalid email value', () => {
    expect(inputValidate({
      email: 'andgm.com',
      password: '123456789',
      text: 'test text',
      oldPassword: '123456789',
      newPassword: '123456789'
    })).toEqual({
      email: 'Invalid email address'
    });
  });

  it('should check validate invalid password value', () => {
    expect(inputValidate({
      email: 'and@gm.com',
      password: '12345',
      text: 'test text',
      oldPassword: '123456789',
      newPassword: '123456789'
    })).toEqual({
      password: 'Must be 6 characters or longer'
    });
  });

  it('should check validate invalid oldPassword value', () => {
    expect(inputValidate({
      email: 'and@gm.com',
      password: '123456789',
      text: 'test text',
      oldPassword: '12345',
      newPassword: '123456789'
    })).toEqual({
      oldPassword: 'Must be 6 characters or longer'
    });
  });

  it('should check validate invalid newPassword value', () => {
    expect(inputValidate({
      email: 'and@gm.com',
      password: '123456789',
      text: 'test text',
      oldPassword: '123456789',
      newPassword: '12345'
    })).toEqual({
      newPassword: 'Must be 6 characters or longer'
    });
  });
});
