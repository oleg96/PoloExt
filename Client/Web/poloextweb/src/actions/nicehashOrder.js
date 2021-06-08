import { NICEHASH_ORDER_SUCCESS } from '../constants/actionTypes.js';
import { order } from '../api/Nicehash/order.js';

const orderSuccess = (response) => {
  return {
    type: NICEHASH_ORDER_SUCCESS,
    response
  };
};

const orderData = (amount, price) => {
  return dispatch => {
    return order(amount, price).then(response => {
      dispatch(orderSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default orderData;
