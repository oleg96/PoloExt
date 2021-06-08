import {
  GET_AUTOMATION_SUCCESS,
  UPDATE_AUTOMATION_SUCCESS
} from '../constants/actionTypes.js';

const automation = (state = [], action) => {
  switch (action.type) {
    case GET_AUTOMATION_SUCCESS:
      return action.automation;
    case UPDATE_AUTOMATION_SUCCESS:
      return action.response;
    default:
      return state;
  }
};

export default automation;
