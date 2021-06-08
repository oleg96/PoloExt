import { UPDATE_POLONIEX_EXCHANGE_RATIO_SUCCESS } from '../constants/actionTypes.js';
import { updateExchangeRatio } from '../api/Poloniex/updateExchangeRatio.js';

const updateExchangeRatioSuccess = (response) => {
  return {
    type: UPDATE_POLONIEX_EXCHANGE_RATIO_SUCCESS,
    response
  };
};

const updateExchangeRatioData = (exchangeRatio) => {
  return dispatch => {
    return updateExchangeRatio(exchangeRatio).then(response => {
      dispatch(updateExchangeRatioSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default updateExchangeRatioData;
