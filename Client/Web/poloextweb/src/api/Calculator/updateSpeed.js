import { SERVER_URL } from '../../constants/serverURL.js';
import validateResponse from '../validateResponse.js';
import Auth from '../../security/auth.js';

export const updateSpeed = (speed) => {

  return fetch(SERVER_URL + '/calculator/updateSpeed',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': Auth.getUserToken()
      },
      body: JSON.stringify({
        'speed': speed
      })
    })
    .then(response => {
      return response.json().then(json => {
        return validateResponse(response) ? json : Promise.reject(json);
      })
    });
};
