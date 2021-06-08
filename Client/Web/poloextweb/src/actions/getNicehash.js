import { GET_NICEHASH_SUCCESS } from '../constants/actionTypes.js';
import { getNicehash } from '../api/Nicehash/getNicehash.js';

const getNicehashSuccess = (nicehash) => {
  return {
    type: GET_NICEHASH_SUCCESS,
    nicehash
  };
};

const getNicehashData = () => {
  return dispatch => {
    return getNicehash().then(response => {
      dispatch(getNicehashSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default getNicehashData;
