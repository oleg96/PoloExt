import { SET_MESSAGE } from '../constants/actionTypes.js';

const setMessage = (message, open) => {

  return {
    type: SET_MESSAGE,
    message: message,
    open: open
  };
};

export default setMessage;
