import { GET_OVERVIEW_SUCCESS } from '../constants/actionTypes.js';
import { getOverview } from '../api/Overview/getOverview.js';

const getOverviewSuccess = (overview) => {
  return {
    type: GET_OVERVIEW_SUCCESS,
    overview
  };
};

const getOverviewData = () => {
  return dispatch => {
    return getOverview().then(response => {
      dispatch(getOverviewSuccess(response));
      return response;
    }).catch(error => {
      throw (error);
    });
  };
};

export default getOverviewData;
