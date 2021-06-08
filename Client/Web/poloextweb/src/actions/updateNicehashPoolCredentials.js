import { UPDATE_NICEHASH_POOL_CREDENTIALS_SUCCESS } from '../constants/actionTypes.js';
import { updatePoolCredentials } from '../api/Nicehash/updatePoolCredentials.js';

const updatePoolCredentialsSuccess = (response) => {
  return {
    type: UPDATE_NICEHASH_POOL_CREDENTIALS_SUCCESS,
    response
  };
};

const updatePoolCredentialsData = (poolName, poolHost, poolPort, poolUsername, poolPassword, poolAlgo) => {
  return dispatch => {
    return updatePoolCredentials(poolName, poolHost, poolPort, poolUsername, poolPassword, poolAlgo).then(response => {
      dispatch(updatePoolCredentialsSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default updatePoolCredentialsData;
