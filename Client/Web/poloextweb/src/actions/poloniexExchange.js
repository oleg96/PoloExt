import { POLONIEX_EXCHANGE_SUCCESS } from '../constants/actionTypes.js';
import { exchange } from '../api/Poloniex/exchange.js';

const exchangeSuccess = (response) => {
  return {
    type: POLONIEX_EXCHANGE_SUCCESS,
    response
  };
};

const exchangeData = (price, volume) => {
  return dispatch => {
    return exchange(price, volume).then(response => {
      dispatch(exchangeSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default exchangeData;
