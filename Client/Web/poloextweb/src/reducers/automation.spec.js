import reducer from './automation.js';
import {
  GET_AUTOMATION_SUCCESS,
  UPDATE_AUTOMATION_SUCCESS
} from '../constants/actionTypes.js';

const automation = {
  isEnabled: false,
  success: true
};

const successMessage = {
  message: 'Updated successfully'
};

describe('automation reducer', () => {

  it('should check GET_AUTOMATION_SUCCESS action', () => {
    expect(
      reducer([], {
        type: GET_AUTOMATION_SUCCESS,
        automation
      })
    ).toEqual(automation);
  });

  it('should check UPDATE_AUTOMATION_SUCCESS action', () => {
    expect(
      reducer([], {
        type: UPDATE_AUTOMATION_SUCCESS,
        response: successMessage
      })
    ).toEqual(successMessage);
  });

  it('should check default action', () => {
    expect(
      reducer([], {})
    ).toEqual([]);
  });
});
