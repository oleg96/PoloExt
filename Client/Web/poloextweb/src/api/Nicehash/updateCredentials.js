import { SERVER_URL } from '../../constants/serverURL.js';
import validateResponse from '../validateResponse.js';
import Auth from '../../security/auth.js';

export const updateCredentials = (apiSecret, apiKey, organizationId) => {

  return fetch(SERVER_URL + '/nicehash/updateCredentials',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': Auth.getUserToken()
      },
      body: JSON.stringify({
        'apiSecret': apiSecret,
        'apiKey': apiKey,
        'organizationId': organizationId
      })
    })
    .then(response => {
      return response.json().then(json => {
        return validateResponse(response) ? json : Promise.reject(json);
      })
    });
};
