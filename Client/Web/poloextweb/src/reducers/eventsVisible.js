import { SET_EVENTS_VISIBLE } from '../constants/actionTypes.js';

const eventsVisible = (state = [], action) => {

  switch (action.type) {
    case SET_EVENTS_VISIBLE:
      return {
        eventsVisible: action.eventsVisible
      };
    default:
      return state;
  }
};

export default eventsVisible;
