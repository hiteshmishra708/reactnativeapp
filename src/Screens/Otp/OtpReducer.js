/* eslint-disable import/no-unresolved */
import { OTP_LOADING, OTP_SUCCESS, OTP_ERROR } from '@redux/Types';
const initialState = {
  error: false,
  errorMessage: "",
  loading: false,


};

const OtpReducer = (state = initialState, action) => {
  switch (action.type) {
    case OTP_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: "",

      };
    case OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: "",

      };
    case OTP_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.message
      };
    default:
      return state;
  }
};

export default OtpReducer;
