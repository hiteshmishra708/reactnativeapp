/* eslint-disable import/no-extraneous-dependencies */
import {OTP_LOADING, OTP_SUCCESS, OTP_ERROR} from '@redux/Types';
import axios from 'axios';
import {SERVERBASEURL} from '@resources/Constants';

const apiUrl = SERVERBASEURL;

export const otpProgress = () => ({
  type: OTP_LOADING,
});

export const otpSuccess = data => ({
  type: OTP_SUCCESS,
  payload: {
    errorCode: data.status,
    errorMessage: data.message,
  },
});

export const otpFailure = data => ({
  type: OTP_ERROR,
  payload: {
    errorMessage: data.message,
  },
});

export const dispatchOtp = (
  method,
  credential,
  isSuccessCallBack,
  isFailcallBack,
) => async dispatch => {
  dispatch(otpProgress());
  try {
    const response = await axios.post(apiUrl + method, credential);
    if (response.status == 200) {
      if (response.data.status == 200) {
        dispatch(otpSuccess(response.data));
        isSuccessCallBack();
      } else {
        dispatch(otpFailure(response.data));
        isFailcallBack(response.data);
      }
    } else {
      dispatch(otpFailure(response.data));
      isFailcallBack(response.data);
    }
  } catch (error) {
    if (error.response) {
      dispatch(otpFailure(error.response.data.message));
      isFailcallBack();
    } else {
      dispatch(otpFailure(error.message));
      isFailcallBack();
    }
  }
};
