import { SERVER_URL } from '../../constants/serverURL.js';
import validateResponse from '../validateResponse.js';
import Auth from '../../security/auth.js';

export const updateWallet = (wallet) => {

  return fetch(SERVER_URL + '/poloniex/updateWallet',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': Auth.getUserToken()
      },
      body: JSON.stringify({
        'wallet': wallet
      })
    })
    .then(response => {
      return response.json().then(json => {
        return validateResponse(response) ? json : Promise.reject(json);
      })
    });
};
