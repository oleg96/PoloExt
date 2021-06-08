import { SET_EVENTS_VISIBLE } from '../constants/actionTypes.js';

const setEventsVisible = (eventsVisible) => {

  return {
    type: SET_EVENTS_VISIBLE,
    eventsVisible
  };
};

export default setEventsVisible;
