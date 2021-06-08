import { loginUser } from '../api/User/loginUser.js';
import Auth from '../security/auth.js';

const login = (email, password) => {

  return () => {
  
    return loginUser(email, password).then(response => {

      Auth.authenticateUser(response.token);

      return response;
    }).catch(error => {

      throw (error);
    });
  };
};

export default login;
