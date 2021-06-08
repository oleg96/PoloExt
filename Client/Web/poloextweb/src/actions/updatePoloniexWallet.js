import { UPDATE_POLONIEX_WALLET_SUCCESS } from '../constants/actionTypes.js';
import { updateWallet } from '../api/Poloniex/updateWallet.js';

const updateWalletSuccess = (response) => {
  return {
    type: UPDATE_POLONIEX_WALLET_SUCCESS,
    response
  };
};

const updateWalletData = (wallet) => {
  return dispatch => {
    return updateWallet(wallet).then(response => {
      dispatch(updateWalletSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default updateWalletData;
