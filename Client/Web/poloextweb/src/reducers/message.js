import { SET_MESSAGE } from '../constants/actionTypes.js';

const message = (state = [], action) => {

  switch (action.type) {
    case SET_MESSAGE:
      return {
        message: action.message,
        open: action.open
      };
    default:
      return state;
  }
};

export default message;
