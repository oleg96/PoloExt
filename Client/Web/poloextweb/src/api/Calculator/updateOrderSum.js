import { SERVER_URL } from '../../constants/serverURL.js';
import validateResponse from '../validateResponse.js';
import Auth from '../../security/auth.js';

export const updateOrderSum = (orderSum) => {

  return fetch(SERVER_URL + '/calculator/updateOrderSum',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': Auth.getUserToken()
      },
      body: JSON.stringify({
        'orderSum': orderSum
      })
    })
    .then(response => {
      return response.json().then(json => {
        return validateResponse(response) ? json : Promise.reject(json);
      })
    });
};
