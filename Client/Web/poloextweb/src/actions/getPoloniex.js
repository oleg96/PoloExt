import { GET_POLONIEX_SUCCESS } from '../constants/actionTypes.js';
import { getPoloniex } from '../api/Poloniex/getPoloniex.js';

const getPoloniexSuccess = (poloniex) => {
  return {
    type: GET_POLONIEX_SUCCESS,
    poloniex
  };
};

const getPoloniexData = () => {
  return dispatch => {
    return getPoloniex().then(response => {
      dispatch(getPoloniexSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default getPoloniexData;
