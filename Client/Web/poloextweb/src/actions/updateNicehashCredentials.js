import { UPDATE_NICEHASH_CREDENTIALS_SUCCESS } from '../constants/actionTypes.js';
import { updateCredentials } from '../api/Nicehash/updateCredentials.js';

const updateCredentialsSuccess = (response) => {
  return {
    type: UPDATE_NICEHASH_CREDENTIALS_SUCCESS,
    response
  };
};

const updateCredentialsData = (apiId, apiKey, twoFA) => {
  return dispatch => {
    return updateCredentials(apiId, apiKey, twoFA).then(response => {
      dispatch(updateCredentialsSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default updateCredentialsData;
