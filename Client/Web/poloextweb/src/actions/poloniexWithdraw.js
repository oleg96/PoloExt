import { POLONIEX_WITHDRAW_SUCCESS } from '../constants/actionTypes.js';
import { withdraw } from '../api/Poloniex/withdraw.js';

const withdrawSuccess = (response) => {
  return {
    type: POLONIEX_WITHDRAW_SUCCESS,
    response
  };
};

const withdrawData = (amount) => {
  return dispatch => {
    return withdraw(amount).then(response => {
      dispatch(withdrawSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default withdrawData;
