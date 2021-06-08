import {
  GET_CALCULATOR_SUCCESS,
  GET_CALCULATOR_SPEED_SUCCESS,
  UPDATE_CALCULATOR_PRICE_SUCCESS,
  UPDATE_CALCULATOR_PROFIT_SUCCESS,
  UPDATE_CALCULATOR_ORDER_SUM_SUCCESS,
  UPDATE_CALCULATOR_SPEED_SUCCESS
} from '../constants/actionTypes.js';

const calculator = (state = [], action) => {
  switch (action.type) {
    case GET_CALCULATOR_SUCCESS:
      return action.calculator;
    case GET_CALCULATOR_SPEED_SUCCESS:
      return action.response;
    case UPDATE_CALCULATOR_PRICE_SUCCESS:
      return action.response;
    case UPDATE_CALCULATOR_PROFIT_SUCCESS:
      return action.response;
    case UPDATE_CALCULATOR_ORDER_SUM_SUCCESS:
      return action.response;
    case UPDATE_CALCULATOR_SPEED_SUCCESS:
      return action.response;
    default:
      return state;
  }
};

export default calculator;
