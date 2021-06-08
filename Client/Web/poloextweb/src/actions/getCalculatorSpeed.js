import { GET_CALCULATOR_SPEED_SUCCESS } from '../constants/actionTypes.js';
import { getCalculatorSpeed } from '../api/Calculator/getCalculatorSpeed.js';

const getCalculatorSpeedSuccess = (response) => {
  return {
    type: GET_CALCULATOR_SPEED_SUCCESS,
    response
  };
};

const getCalculatorSpeedData = () => {
  return dispatch => {
    return getCalculatorSpeed().then(response => {
      dispatch(getCalculatorSpeedSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default getCalculatorSpeedData;
