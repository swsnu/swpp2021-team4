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
  username: string,
  password: string
}

export const signinAction = (formData: SigninFormType) => {
  return (dispatch: Redux.Dispatch<UserDispatchType>) => {
    return axios.post<UserType>('/user/signin/', formData)
      .then(res => dispatch({ type: SIGNIN_SUCCESS, payload: res.data }))
      .catch(() => dispatch({ type: SIGNIN_FAIL }));
  }
}

export const signoutAction = () => {
  return (dispatch: Redux.Dispatch<UserDispatchType>) => {
    return axios.post('/user/signuout/')
      .then(() => dispatch({ type: SIGNOUT_SUCCESS }))
      .catch(() => dispatch({ type: SIGNOUT_FAIL }));
  }
}
