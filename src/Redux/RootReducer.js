/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers } from 'redux';
import LoginReducer from '@login/LoginReducer';
import ForgetPasswordReducer from '@forgotpwd/ForgetPasswordReducer';
import OtpReducer from '@otp/OtpReducer';
import ResetPwdReducer from '@resetpwd/ResetPwdReducer';
import ProfileReducer from '@profile/ProfileReducer';

const rootReducer = combineReducers({
  LoginReducer,
  ForgetPasswordReducer,
  OtpReducer,
  ResetPwdReducer,
  ProfileReducer,
});

export default rootReducer;
