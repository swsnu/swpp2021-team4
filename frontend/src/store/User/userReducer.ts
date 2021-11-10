import {
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAIL,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
} from '../actionTypes';

import {
  UserDispatchType,
  UserType
} from './userInterfaces';

export type UserStateType = {
  loggedUser: UserType,
}

const initialState: UserStateType = {
  loggedUser: {
    id: 0,
    email: '',
    username: '',
    profileImage: '',
    folders: []
  }
}

export default (state: UserStateType = initialState, action: UserDispatchType): UserStateType => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return { ...state, loggedUser: { ...action.payload } };
    case SIGNIN_FAIL:
      return { ...state };
    case SIGNOUT_SUCCESS:
      return { ...state, loggedUser: initialState.loggedUser };
    case SIGNOUT_FAIL:
      return { ...state };
    case EDIT_PROFILE_SUCCESS:
      return { ...state, loggedUser: { ...action.payload } };
    case EDIT_PROFILE_FAIL:
      return { ...state };
    default:
      return state;
  }
}
