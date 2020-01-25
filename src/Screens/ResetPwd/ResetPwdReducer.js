/* eslint-disable import/no-unresolved */

import { RESTPWD_LOADING, RESETPWD_SUCCESS, RESETPWD_ERROR } from "@redux/Types";

const initialState = {
  error: false,
  errorMessage: "",
  loading: false,
  token:''

};

const ResetPwdReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESTPWD_LOADING:
      return {
        ...state,
        loading:true,
        error: false,
        errorMessage: "",
        
      };
    case RESETPWD_SUCCESS:
      return {
        ...state,
        loading: false,
        error:false,
        errorMessage: "",

      };
    case RESETPWD_ERROR:
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

export default ResetPwdReducer;
