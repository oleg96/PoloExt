import {
  GET_NICEHASH_SUCCESS,
  GET_NICEHASH_SPEED_LIMIT_SUCCESS,
  UPDATE_NICEHASH_SPEED_LIMIT_SUCCESS,
  NICEHASH_ORDER_SUCCESS,
  NICEHASH_CANCEL_ORDER_SUCCESS,
  NICEHASH_ORDER_INCREASE_PRICE_SUCCESS,
  NICEHASH_ORDER_DECREASE_PRICE_SUCCESS,
  NICEHASH_ORDER_CHANGE_LIMIT_SUCCESS
} from '../constants/actionTypes.js';

const nicehash = (state = [], action) => {
  switch (action.type) {
    case GET_NICEHASH_SUCCESS:
      return action.nicehash;
    case GET_NICEHASH_SPEED_LIMIT_SUCCESS:
      return action.response;
    case UPDATE_NICEHASH_SPEED_LIMIT_SUCCESS:
      return action.response;
    case NICEHASH_ORDER_SUCCESS:
      return action.response;
    case NICEHASH_CANCEL_ORDER_SUCCESS:
      return action.response;
    case NICEHASH_ORDER_INCREASE_PRICE_SUCCESS:
      return action.response;
    case NICEHASH_ORDER_DECREASE_PRICE_SUCCESS:
      return action.response;
    case NICEHASH_ORDER_CHANGE_LIMIT_SUCCESS:
      return action.response;
    default:
      return state;
  }
};

export default nicehash;
