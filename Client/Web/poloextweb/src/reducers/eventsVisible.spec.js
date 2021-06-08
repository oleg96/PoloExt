import reducer from './eventsVisible.js';
import { SET_EVENTS_VISIBLE } from '../constants/actionTypes.js';

describe('eventsVisible reducer', () => {

  it('should check SET_EVENTS_VISIBLE action', () => {

    expect(
      reducer([], {
        type: SET_EVENTS_VISIBLE,
        eventsVisible: true
      })
    ).toEqual(
      {
        eventsVisible: true
      }
    );

    expect(
      reducer([], {
        type: SET_EVENTS_VISIBLE,
        eventsVisible: false
      })
    ).toEqual(
      {
        eventsVisible: false
      }
    );
  });

  it('should check default action', () => {
    expect(
      reducer([], {})
    ).toEqual([]);
  });
});
