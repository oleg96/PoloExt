import { GET_NICEHASH_SPEED_LIMIT_SUCCESS } from '../constants/actionTypes.js';
import { getSpeedLimit } from '../api/Nicehash/getSpeedLimit.js';

const getSpeedLimitSuccess = (response) => {
  return {
    type: GET_NICEHASH_SPEED_LIMIT_SUCCESS,
    response
  };
};

const getSpeedLimitData = () => {
  return dispatch => {
    return getSpeedLimit().then(response => {
      dispatch(getSpeedLimitSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default getSpeedLimitData;
