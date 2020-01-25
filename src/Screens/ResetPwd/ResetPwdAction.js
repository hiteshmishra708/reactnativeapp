/* eslint-disable import/no-extraneous-dependencies */
import {RESTPWD_LOADING, RESETPWD_SUCCESS, RESETPWD_ERROR} from '@redux/Types';
import axios from 'axios';
import {SERVERBASEURL} from '@resources/Constants';
import {object} from 'prop-types';

const apiUrl = SERVERBASEURL;

export const resetPwdProgress = () => ({
  type: RESTPWD_LOADING,
});

export const resetPwdSuccess = data => ({
  type: RESETPWD_SUCCESS,
  payload: {
    errorCode: data.status,
    errorMessage: data.message,
  },
});

export const resetPwdFailure = data => ({
  type: RESETPWD_ERROR,
  payload: {
    message: data,
  },
});

export const dispatchResetPwd = (
  method,
  credential,
  isSuccessCallBack,
  isFailcallBack,
) => async dispatch => {
  dispatch(resetPwdProgress());
  try {
    let config = {
      headers: {
        'access-token': credential.header,
      },
    };
    const response = await axios.post(apiUrl + method, credential.body, config);
    if (response.status == 200) {
      if (response.data.status == 200) {
        dispatch(resetPwdSuccess(response.data));
        isSuccessCallBack();
      } else {
        dispatch(resetPwdFailure(response.data));
        isFailcallBack();
      }
    } else {
      dispatch(resetPwdFailure(response.data));
      isFailcallBack(response.data);
    }
  } catch (error) {
    if (error.response) {
      dispatch(resetPwdFailure(error.response.data.message));
      isFailcall();
    } else {
      dispatch(resetPwdFailure(error.message));
      isFailcall();
    }
  }
};
