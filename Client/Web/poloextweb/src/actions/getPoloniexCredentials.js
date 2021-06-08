import { GET_POLONIEX_CREDENTIALS_SUCCESS } from '../constants/actionTypes.js';
import { getCredentials } from '../api/Poloniex/getCredentials.js';

const getCredentialsSuccess = (response) => {
  return {
    type: GET_POLONIEX_CREDENTIALS_SUCCESS,
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
