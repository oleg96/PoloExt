import jwtDecode from 'jwt-decode';

class Auth {

  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  static getUserToken() {
    return localStorage.getItem('token');
  }

  static decodeToken() {
    return jwtDecode(localStorage.getItem('token'));
  }
}

export default Auth;
