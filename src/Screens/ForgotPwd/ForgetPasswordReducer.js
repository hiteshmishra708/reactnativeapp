/* eslint-disable import/no-unresolved */

import { FGTPWD_LOADING, FGTPWD_SUCCESS, FGTPWD_ERROR } from "@redux/Types";

const initialState = {
  error: false,
  errorMessage: "",
  loading: false,

};

const ForgetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FGTPWD_LOADING:
      return {
        ...state,
        loading:true,
        error: false,
        errorMessage: "",
        
      };
    case FGTPWD_SUCCESS:
      return {
        ...state,
        loading:false,
        error:false,
        errorMessage: "",

      };
    case FGTPWD_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.errorMessage      
      };
    default:
      return state;
  }
};

export default ForgetPasswordReducer;
