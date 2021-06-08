import { UPDATE_CALCULATOR_PRICE_SUCCESS } from '../constants/actionTypes.js';
import { updatePrice } from '../api/Calculator/updatePrice.js';

const updatePriceSuccess = (response) => {
  return {
    type: UPDATE_CALCULATOR_PRICE_SUCCESS,
    response
  };
};

const updatePriceData = (price) => {
  return dispatch => {
    return updatePrice(price).then(response => {
      dispatch(updatePriceSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default updatePriceData;
