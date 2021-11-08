import axios from 'axios';
import * as Redux from 'redux';
import {
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAIL
} from '../actionTypes';
import { UserDispatchType, UserType } from './userInterfaces';

interface SigninFormType {
  email: string,
  password: string
}

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

export const signinAction = (formData: SigninFormType) => {
  return (dispatch: Redux.Dispatch<UserDispatchType>) => {
    return axios.post<{ logged_user: UserType}>('/user/signin/', formData)
      .then(res => {
        dispatch({ type: SIGNIN_SUCCESS, payload: res.data.logged_user });
        sessionStorage.setItem('isAuthorized', 'true');
      })
      .catch(() => dispatch({ type: SIGNIN_FAIL }));
  }
}

export const signoutAction = () => {
  return (dispatch: Redux.Dispatch<UserDispatchType>) => {
    return axios.post('/user/signout/')
      .then(() => {
        dispatch({ type: SIGNOUT_SUCCESS });
        sessionStorage.removeItem('isAuthorized');
      })
      .catch(() => dispatch({ type: SIGNOUT_FAIL }));
  }
}
