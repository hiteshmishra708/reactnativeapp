/* eslint-disable import/no-extraneous-dependencies */
import {
  PROFILE_LOADING,
  PROFILE_SUCCESS,
  PROFILE_ERROR,
  PROFILE_CITY_ERROR,
  PROFILE_CITY_SUCCESS,
} from '@redux/Types';
import axios from 'axios';
import {SERVERBASEURL} from '@resources/Constants';
import AsyncStorage from '@react-native-community/async-storage';

const apiUrl = SERVERBASEURL;

export const profileProgress = () => ({
  type: PROFILE_LOADING,
});

export const profileSuccess = () => ({
  type: PROFILE_SUCCESS,
});

export const profileFailure = data => ({
  type: PROFILE_ERROR,
  payload: {
    message: data,
  },
});
export const citySuccess = data => ({
  type: PROFILE_CITY_SUCCESS,
  payload: {
    data: data,
  },
});

export const cityFailure = data => ({
  type: PROFILE_CITY_ERROR,
  payload: {
    message: data,
  },
});

export const dispatchProfile = (
  method,
  credential,
  isSuccessCallBack,
  isFailcallBack,
) => async dispatch => {
  dispatch(profileProgress());
  try {
    let config = {
      headers: {
        'access-token': credential,
      },
    };
    const response = await axios.post(apiUrl + method, {}, config);
    if (response.status == 200) {
      if (response.data.status == 200) {
        dispatch(profileSuccess());
        isSuccessCallBack(response.data);
      } else {
        dispatch(profileFailure(response.data.message));
        isFailcallBack(response.data);
      }
    } else {
      dispatch(profileFailure(response.data));
      isFailcallBack(response.data);
    }
  } catch (error) {
    if (error.response) {
      dispatch(profileFailure(error.response.data.message));
      isFailcallBack();
    } else {
      dispatch(profileFailure(error.message));
      isFailcallBack();
    }
  }
};

export const dispatchCity = (
  method,
  isSuccessCallBack,
  isFailcallBack,
) => async dispatch => {
  dispatch(profileProgress());
  try {
    let token = await AsyncStorage.getItem('token');
    let config = {
      headers: {
        'access-token': token,
      },
    };
    const response = await axios.post(apiUrl + method, {}, config);

    if (response.status == 200) {
      if (response.data.status == 200) {
        dispatch(citySuccess(response.data.data));
        isSuccessCallBack(response.data.data);
      } else {
        dispatch(cityFailure(response.data.message));
        isFailcallBack(response.data);
      }
    } else {
      dispatch(cityFailure(response.data));
      isFailcallBack(response.data);
    }
  } catch (error) {
    if (error.response) {
      dispatch(cityFailure(error.response.data.message));
      isFailcallBack();
    } else {
      dispatch(cityFailure(error.message));
      isFailcallBack();
    }
  }
};
