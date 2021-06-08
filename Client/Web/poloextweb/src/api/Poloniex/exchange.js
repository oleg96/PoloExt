import { SERVER_URL } from '../../constants/serverURL.js';
import validateResponse from '../validateResponse.js';
import Auth from '../../security/auth.js';

export const exchange = (price, volume) => {

  return fetch(SERVER_URL + '/poloniex/exchange',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': Auth.getUserToken()
      },
      body: JSON.stringify({
        'price': price,
        'volume': volume
      })
    })
    .then(response => {
      return response.json().then(json => {
        return validateResponse(response) ? json : Promise.reject(json);
      })
    });
};
