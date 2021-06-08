import { NICEHASH_ORDER_CHANGE_LIMIT_SUCCESS } from '../constants/actionTypes.js';
import { orderChangeLimit } from '../api/Nicehash/orderChangeLimit.js';

const orderChangeLimitSuccess = (response) => {
  return {
    type: NICEHASH_ORDER_CHANGE_LIMIT_SUCCESS,
    response
  };
};

const orderChangeLimitData = (order, speedLimit) => {
  return dispatch => {
    return orderChangeLimit(order, speedLimit).then(response => {
      dispatch(orderChangeLimitSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default orderChangeLimitData;
