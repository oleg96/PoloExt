import Auth from './auth.js';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWI0ZDAyZWI0NDg3NjkxYTAwOWE1MWNhIiwiaWF0IjoxNTM5NTEzMTI5LCJleHAiOjE1Mzk1MjM5Mjl9.Y7mM-UHWFSc0gEs1gP3aBNzO7OT7PvkGyxO7-UmrAJ4';

describe('auth test', () => {

  it('should check authenticateUser', () => {
    Auth.authenticateUser(token);
    expect(global.localStorage.token).toEqual(token);
  });

  it('should check isUserAuthenticated', () => {
    expect(Auth.isUserAuthenticated()).toBe(true);
  });

  it('should check getUserToken', () => {
    expect(Auth.getUserToken()).toEqual(token);
  });

  it('should check decodeToken', () => {
    expect(Auth.decodeToken()).toEqual({
      'exp': 1539523929,
      'iat': 1539513129,
      'user_id': '5b4d02eb4487691a009a51ca'
    });
  });

  it('should check deauthenticateUser', () => {
    Auth.deauthenticateUser();
    expect(global.localStorage.token).toEqual(undefined);
  });
});
