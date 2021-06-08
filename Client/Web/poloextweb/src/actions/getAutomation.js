import { GET_AUTOMATION_SUCCESS } from '../constants/actionTypes.js';
import { getAutomation } from '../api/Automation/getAutomation.js';

const getAutomationSuccess = (automation) => {
  return {
    type: GET_AUTOMATION_SUCCESS,
    automation
  };
};

const getAutomationData = () => {
  return dispatch => {
    return getAutomation().then(response => {
      dispatch(getAutomationSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default getAutomationData;
