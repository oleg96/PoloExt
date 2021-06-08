import { UPDATE_CALCULATOR_PROFIT_SUCCESS } from '../constants/actionTypes.js';
import { updateProfit } from '../api/Calculator/updateProfit.js';

const updateProfitSuccess = (response) => {
  return {
    type: UPDATE_CALCULATOR_PROFIT_SUCCESS,
    response
  };
};

const updateProfitData = (profit) => {
  return dispatch => {
    return updateProfit(profit).then(response => {
      dispatch(updateProfitSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default updateProfitData;
