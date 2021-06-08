import { GET_NICEHASH_CREDENTIALS_SUCCESS } from '../constants/actionTypes.js';
import { getCredentials } from '../api/Nicehash/getCredentials.js';

const getCredentialsSuccess = (response) => {
  return {
    type: GET_NICEHASH_CREDENTIALS_SUCCESS,
    response
  };
};

const getCredentialsData = () => {
  return dispatch => {
    return getCredentials().then(response => {
      dispatch(getCredentialsSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default getCredentialsData;
