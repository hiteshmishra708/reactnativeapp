/* eslint-disable import/no-extraneous-dependencies */
import {FGTPWD_LOADING, FGTPWD_SUCCESS, FGTPWD_ERROR} from '@redux/Types';
import axios from 'axios';
import {SERVERBASEURL} from '@resources/Constants';

const apiUrl = SERVERBASEURL;

export const forgetPwdProgress = () => ({
  type: FGTPWD_LOADING,
});

export const forgetPwdSuccess = data => ({
  type: FGTPWD_SUCCESS,
  payload: {
    errorCode: data.status,
    errorMessage: data.message,
  },
});

export const forgetPwdFailure = data => ({
  type: FGTPWD_ERROR,
  payload: {
    errorMessage: data,
  },
});

export const dispatchForgetPwd = (
  method,
  credential,
  isSuccessCallBack,
  isFailcallBack,
) => async dispatch => {
  dispatch(forgetPwdProgress());
  try {
    const response = await axios.post(apiUrl + method, credential);
    if (response.status == 200) {
      if (response.data.status == 200) {
        dispatch(forgetPwdSuccess(response.data));
        isSuccessCallBack();
      } else {
        dispatch(forgetPwdFailure(response.data.message));
        isFailcallBack(response.data);
      }
    } else {
      dispatch(forgetPwdFailure(response.data.message));
      isFailcallBack(response.data);
    }
  } catch (error) {
    dispatch(forgetPwdFailure(error.response.data.message));
    isFailcallBack();
  }
};
