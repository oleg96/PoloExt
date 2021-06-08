import { POLONIEX_CANCEL_EXCHANGE_SUCCESS } from '../constants/actionTypes.js';
import { cancelExchange } from '../api/Poloniex/cancelExchange.js';

const cancelExchangeSuccess = (response) => {
  return {
    type: POLONIEX_CANCEL_EXCHANGE_SUCCESS,
    response
  };
};

const cancelExchangeData = (orderNumber) => {
  return dispatch => {
    return cancelExchange(orderNumber).then(response => {
      dispatch(cancelExchangeSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default cancelExchangeData;
