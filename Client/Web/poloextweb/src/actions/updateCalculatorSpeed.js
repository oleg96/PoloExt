import { UPDATE_CALCULATOR_SPEED_SUCCESS } from '../constants/actionTypes.js';
import { updateSpeed } from '../api/Calculator/updateSpeed.js';

const updateSpeedSuccess = (response) => {
  return {
    type: UPDATE_CALCULATOR_SPEED_SUCCESS,
    response
  };
};

const updateSpeedData = (speed) => {
  return dispatch => {
    return updateSpeed(speed).then(response => {
      dispatch(updateSpeedSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default updateSpeedData;
