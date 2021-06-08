import {
  GET_POLONIEX_SUCCESS,
  UPDATE_POLONIEX_EXCHANGE_RATIO_SUCCESS,
  GET_POLONIEX_EXCHANGE_RATIO_SUCCESS,
  POLONIEX_EXCHANGE_SUCCESS,
  POLONIEX_CANCEL_EXCHANGE_SUCCESS,
  GET_POLONIEX_WALLET_SUCCESS,
  UPDATE_POLONIEX_WALLET_SUCCESS,
  POLONIEX_WITHDRAW_SUCCESS
} from '../constants/actionTypes.js';

const poloniex = (state = [], action) => {
  switch (action.type) {
    case GET_POLONIEX_SUCCESS:
      return action.poloniex;
    case UPDATE_POLONIEX_EXCHANGE_RATIO_SUCCESS:
      return action.response;
    case GET_POLONIEX_EXCHANGE_RATIO_SUCCESS:
      return action.response;
    case POLONIEX_EXCHANGE_SUCCESS:
      return action.response;
    case POLONIEX_CANCEL_EXCHANGE_SUCCESS:
      return action.response;
    case GET_POLONIEX_WALLET_SUCCESS:
      return action.response;
    case UPDATE_POLONIEX_WALLET_SUCCESS:
      return action.response;
    case POLONIEX_WITHDRAW_SUCCESS:
      return action.response;
    default:
      return state;
  }
};

export default poloniex;
