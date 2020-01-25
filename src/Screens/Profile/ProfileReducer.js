/* eslint-disable import/no-unresolved */

import {
  PROFILE_LOADING,
  PROFILE_SUCCESS,
  PROFILE_ERROR,
  PROFILE_CITY_SUCCESS,
  PROFILE_CITY_ERROR,
} from '@redux/Types';

const initialState = {
  errorMessage: '',
  loading: false,
  cityList: [],
  cityError: '',
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: '',
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.message,
      };
    case PROFILE_CITY_SUCCESS:
      return {
        ...state,
        loading: false,
        cityList: action.payload.data,
        cityError: '',
      };
    case PROFILE_CITY_ERROR:
      return {
        ...state,
        loading: false,
        cityError: action.payload.message,
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default ProfileReducer;
