import { SERVER_URL } from '../../constants/serverURL.js';
import validateResponse from '../validateResponse.js';
import Auth from '../../security/auth.js';

export const withdraw = (amount) => {

  return fetch(SERVER_URL + '/poloniex/withdraw',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': Auth.getUserToken()
      },
      body: JSON.stringify({
        'amount': amount
      })
    })
    .then(response => {
      return response.json().then(json => {
        return validateResponse(response) ? json : Promise.reject(json);
      })
    });
};
