import {
  GET_POLONIEX_CREDENTIALS_SUCCESS,
  UPDATE_POLONIEX_CREDENTIALS_SUCCESS,
  GET_NICEHASH_CREDENTIALS_SUCCESS,
  UPDATE_NICEHASH_CREDENTIALS_SUCCESS,
  GET_NICEHASH_POOL_CREDENTIALS_SUCCESS,
  UPDATE_NICEHASH_POOL_CREDENTIALS_SUCCESS,
  UPDATE_USER_CREDENTIALS_SUCCESS
} from '../constants/actionTypes.js';

const credentials = (state = [], action) => {
  switch (action.type) {
    case GET_POLONIEX_CREDENTIALS_SUCCESS:
      return action.response;
    case UPDATE_POLONIEX_CREDENTIALS_SUCCESS:
      return action.response;
    case GET_NICEHASH_CREDENTIALS_SUCCESS:
      return action.response;
    case UPDATE_NICEHASH_CREDENTIALS_SUCCESS:
      return action.response;
    case GET_NICEHASH_POOL_CREDENTIALS_SUCCESS:
      return action.response;
    case UPDATE_NICEHASH_POOL_CREDENTIALS_SUCCESS:
      return action.response;
    case UPDATE_USER_CREDENTIALS_SUCCESS:
      return action.response;
    default:
      return state;
  }
};

export default credentials;
