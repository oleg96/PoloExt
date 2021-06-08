import { GET_NICEHASH_POOL_CREDENTIALS_SUCCESS } from '../constants/actionTypes.js';
import { getPoolCredentials } from '../api/Nicehash/getPoolCredentials.js';

const getPoolCredentialsSuccess = (response) => {
  return {
    type: GET_NICEHASH_POOL_CREDENTIALS_SUCCESS,
    response
  };
};

const getPoolCredentialsData = () => {
  return dispatch => {
    return getPoolCredentials().then(response => {
      dispatch(getPoolCredentialsSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default getPoolCredentialsData;
