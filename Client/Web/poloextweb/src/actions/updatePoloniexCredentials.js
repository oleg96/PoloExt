import { UPDATE_POLONIEX_CREDENTIALS_SUCCESS } from '../constants/actionTypes.js';
import { updateCredentials } from '../api/Poloniex/updateCredentials.js';

const updateCredentialsSuccess = (response) => {
  return {
    type: UPDATE_POLONIEX_CREDENTIALS_SUCCESS,
    response
  };
};

const updateCredentialsData = (publicKey, privateKey) => {
  return dispatch => {
    return updateCredentials(publicKey, privateKey).then(response => {
      dispatch(updateCredentialsSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default updateCredentialsData;
