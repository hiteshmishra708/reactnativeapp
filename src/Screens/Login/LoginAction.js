/* eslint-disable import/no-extraneous-dependencies */
import {LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_ERROR} from '@redux/Types';
import axios from 'axios';
import {SERVERBASEURL} from '@resources/Constants';

const apiUrl = SERVERBASEURL;

export const loginProgress = () => ({
  type: LOGIN_LOADING,
});

export const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: {
    errorCode: data.status,
    errorMessage: data.message,
  },
});

export const loginFailure = data => ({
  type: LOGIN_ERROR,
  payload: {
    message: data,
  },
});

export const dispatchLogin = (
  method,
  credential,
  isSuccessCallBack,
  isFailcallBack,
) => async dispatch => {
  dispatch(loginProgress());
  try {
    const response = await axios.post(apiUrl + method, credential);
    if (response.status == 200) {
      if (response.data.status == 200) {
        dispatch(loginSuccess(response.data.message));
        isSuccessCallBack(response.data);
      } else {
        dispatch(loginFailure(response.data.message));
        isFailcallBack(response.data);
      }
    } else {
      dispatch(loginFailure(response.data));
      isFailcallBack(response.data);
    }
  } catch (error) {
    if (error.response) {
      dispatch(loginFailure(error.response.data.message));
      isFailcallBack();
    } else {
      dispatch(loginFailure(error.message));
      isFailcallBack();
    }
  }
};
