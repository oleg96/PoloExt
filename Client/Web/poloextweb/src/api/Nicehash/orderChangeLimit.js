import { SERVER_URL } from '../../constants/serverURL.js';
import validateResponse from '../validateResponse.js';
import Auth from '../../security/auth.js';

export const orderChangeLimit = (order, speedLimit) => {

  return fetch(SERVER_URL + '/nicehash/orderSpeedLimit',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': Auth.getUserToken()
      },
      body: JSON.stringify({
        'order': order,
        'speedLimit': speedLimit
      })
    })
    .then(response => {
      return response.json().then(json => {
        return validateResponse(response) ? json : Promise.reject(json);
      })
    });
};
