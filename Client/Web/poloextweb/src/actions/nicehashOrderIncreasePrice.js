import { NICEHASH_ORDER_INCREASE_PRICE_SUCCESS } from '../constants/actionTypes.js';
import { orderIncreasePrice } from '../api/Nicehash/orderIncreasePrice.js';

const orderIncreasePriceSuccess = (response) => {
  return {
    type: NICEHASH_ORDER_INCREASE_PRICE_SUCCESS,
    response
  };
};

const orderIncreasePriceData = (order, price) => {
  return dispatch => {
    return orderIncreasePrice(order, price).then(response => {
      dispatch(orderIncreasePriceSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default orderIncreasePriceData;
