import {
  GET_OVERVIEW_SUCCESS
} from '../constants/actionTypes.js';

const overview = (state = [], action) => {
  switch (action.type) {
    case GET_OVERVIEW_SUCCESS:
      return action.overview;
    default:
      return state;
  }
};

export default overview;
