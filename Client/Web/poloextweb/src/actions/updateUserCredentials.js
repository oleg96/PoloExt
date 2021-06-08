import { UPDATE_USER_CREDENTIALS_SUCCESS } from '../constants/actionTypes.js';
import { updateCredentials } from '../api/User/updateCredentials.js';

const updateCredentialsSuccess = (response) => {
  return {
    type: UPDATE_USER_CREDENTIALS_SUCCESS,
    response
  };
};

const updateCredentialsData = (oldPassword, newPassword) => {
  return dispatch => {
    return updateCredentials(oldPassword, newPassword).then(response => {
      dispatch(updateCredentialsSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default updateCredentialsData;
