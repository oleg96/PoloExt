import { SERVER_URL } from '../../constants/serverURL.js';
import validateResponse from '../validateResponse.js';
import Auth from '../../security/auth.js';

export const getPoolCredentials = () => {

  return fetch(SERVER_URL + '/nicehash/poolCredentials',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': Auth.getUserToken()
      }
    })
    .then(response => {
      return response.json().then(json => {
        return validateResponse(response) ? json : Promise.reject(json);
      })
    });
};
