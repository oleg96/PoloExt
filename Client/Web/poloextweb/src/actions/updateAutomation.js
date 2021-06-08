import { UPDATE_AUTOMATION_SUCCESS } from '../constants/actionTypes.js';
import { updateAutomation } from '../api/Automation/updateAutomation.js';

const updateAutomationSuccess = (response) => {
  return {
    type: UPDATE_AUTOMATION_SUCCESS,
    response
  };
};

const updateAutomationData = (isEnabled) => {
  return dispatch => {
    return updateAutomation(isEnabled).then(response => {
      dispatch(updateAutomationSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default updateAutomationData;
