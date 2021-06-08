import { SERVER_URL } from '../../constants/serverURL.js';
import validateResponse from '../validateResponse.js';
import Auth from '../../security/auth.js';

function unionArrays(accumulator, currentValue) {

  return { ...accumulator, ...currentValue };
}

const calculatorInfo = () => {

  return fetch(SERVER_URL + '/calculator/info',
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

const poloniexInfo = () => {

  return fetch(SERVER_URL + '/poloniex/info',
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

const nicehashInfo = () => {

  return fetch(SERVER_URL + '/nicehash/info',
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

export const getOverview = () => {

  return Promise.all([calculatorInfo(), poloniexInfo(), nicehashInfo()])
    .then(response => response.reduce(unionArrays, {}));
};
