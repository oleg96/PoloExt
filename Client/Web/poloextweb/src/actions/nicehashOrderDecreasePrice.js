import { NICEHASH_ORDER_DECREASE_PRICE_SUCCESS } from '../constants/actionTypes.js';
import { orderDecreasePrice } from '../api/Nicehash/orderDecreasePrice.js';

const orderDecreasePriceSuccess = (response) => {
  return {
    type: NICEHASH_ORDER_DECREASE_PRICE_SUCCESS,
    response
  };
};

const orderDecreasePriceData = (order) => {
  return dispatch => {
    return orderDecreasePrice(order).then(response => {
      dispatch(orderDecreasePriceSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default orderDecreasePriceData;
