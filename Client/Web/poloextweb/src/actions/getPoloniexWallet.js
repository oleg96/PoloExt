import { GET_POLONIEX_WALLET_SUCCESS } from '../constants/actionTypes.js';
import { getWallet } from '../api/Poloniex/getWallet.js';

const getWalletSuccess = (response) => {
  return {
    type: GET_POLONIEX_WALLET_SUCCESS,
    response
  };
};

const getWalletData = () => {
  return dispatch => {
    return getWallet().then(response => {
      dispatch(getWalletSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default getWalletData;
