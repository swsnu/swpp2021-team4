import axios from 'axios';
import * as Redux from 'redux';
import {
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAIL,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
} from '../actionTypes';
import { UserDispatchType, UserType } from './userInterfaces';

interface SigninFormType {
  email: string,
  password: string
}

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

export const signinAction = (formData: SigninFormType, callbackFunc: (value: boolean) => void) => {
  return (dispatch: Redux.Dispatch<UserDispatchType>) => {
    return axios.post<{ logged_user: UserType }>('/user/signin/', formData)
      .then(res => {
        dispatch({ type: SIGNIN_SUCCESS, payload: res.data.logged_user });
        localStorage.setItem('isAuthorized', 'true');
        callbackFunc(true);
      })
      .catch(() => {
        dispatch({ type: SIGNIN_FAIL });
      });
  }
}

export const signoutAction = () => {
  return (dispatch: Redux.Dispatch<UserDispatchType>) => {
    return axios.post('/user/signout/')
      .then(() => {
        dispatch({ type: SIGNOUT_SUCCESS });
        localStorage.removeItem('isAuthorized');
      })
      .catch(() => dispatch({ type: SIGNOUT_FAIL }));
  }
}

export const editProfileAction = (user_id: number, formData: any, callbackFunc: (value: boolean) => void) => {
  return (dispatch: Redux.Dispatch<UserDispatchType>) => {
    return axios.post<{ logged_user: UserType }>(`/user/${user_id}/edit/`, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
      .then(res => {
        dispatch({ type: EDIT_PROFILE_SUCCESS, payload: res.data.logged_user });
        callbackFunc(true);
      })
      .catch(() => {
        dispatch({ type: EDIT_PROFILE_FAIL });
      });
  }
}
