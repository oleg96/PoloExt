import { GET_POLONIEX_EXCHANGE_RATIO_SUCCESS } from '../constants/actionTypes.js';
import { getExchangeRatio } from '../api/Poloniex/getExchangeRatio.js';

const getExchangeRatioSuccess = (response) => {
  return {
    type: GET_POLONIEX_EXCHANGE_RATIO_SUCCESS,
    response
  };
};

const getExchangeRatioData = () => {
  return dispatch => {
    return getExchangeRatio().then(response => {
      dispatch(getExchangeRatioSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default getExchangeRatioData;
