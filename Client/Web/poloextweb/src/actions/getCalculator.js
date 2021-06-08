import { GET_CALCULATOR_SUCCESS } from '../constants/actionTypes.js';
import { getCalculator } from '../api/Calculator/getCalculator.js';

const getCalculatorSuccess = (calculator) => {
  return {
    type: GET_CALCULATOR_SUCCESS,
    calculator
  };
};

const getCalculatorData = () => {
  return dispatch => {
    return getCalculator().then(response => {
      dispatch(getCalculatorSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default getCalculatorData;
