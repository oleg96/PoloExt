import { NICEHASH_CANCEL_ORDER_SUCCESS } from '../constants/actionTypes.js';
import { cancelOrder } from '../api/Nicehash/cancelOrder.js';

const cancelOrderSuccess = (response) => {
  return {
    type: NICEHASH_CANCEL_ORDER_SUCCESS,
    response
  };
};

const cancelOrderData = (order) => {
  return dispatch => {
    return cancelOrder(order).then(response => {
      dispatch(cancelOrderSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default cancelOrderData;
