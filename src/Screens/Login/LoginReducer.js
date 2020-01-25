/* eslint-disable import/no-unresolved */

import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_ERROR } from "@redux/Types";

const initialState = {
  error: false,
  errorMessage: "",
  loading: false,
  token:''

};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loading:true,
        error: false,
        errorMessage: "",
        token:''
        
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error:false,
        errorMessage: "",
        token:action.payload.token

      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        token:'',
        errorMessage: action.payload.message      
      };
    default:
      return state;
  }
};

export default LoginReducer;
