import { UPDATE_NICEHASH_SPEED_LIMIT_SUCCESS } from '../constants/actionTypes.js';
import { updateSpeedLimit } from '../api/Nicehash/updateSpeedLimit.js';

const updateSpeedLimitSuccess = (response) => {
  return {
    type: UPDATE_NICEHASH_SPEED_LIMIT_SUCCESS,
    response
  };
};

const updateSpeedLimitData = (speedLimit) => {
  return dispatch => {
    return updateSpeedLimit(speedLimit).then(response => {
      dispatch(updateSpeedLimitSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default updateSpeedLimitData;
