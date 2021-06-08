import { UPDATE_CALCULATOR_ORDER_SUM_SUCCESS } from '../constants/actionTypes.js';
import { updateOrderSum } from '../api/Calculator/updateOrderSum.js';

const updateOrderSumSuccess = (response) => {
  return {
    type: UPDATE_CALCULATOR_ORDER_SUM_SUCCESS,
    response
  };
};

const updateOrderSumData = (orderSum) => {
  return dispatch => {
    return updateOrderSum(orderSum).then(response => {
      dispatch(updateOrderSumSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default updateOrderSumData;
