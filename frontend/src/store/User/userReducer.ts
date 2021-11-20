import {
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAIL,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  EDIT_FOLDER_SUCCESS,
  EDIT_FOLDER_FAIL,
  DELETE_FOLDER_SUCCESS,
  DELETE_FOLDER_FAIL,
} from '../actionTypes';

import { UserDispatchType, UserType } from "./userInterfaces";

export type UserStateType = {
  loggedUser: UserType,
}

const initialState: UserStateType = {
  loggedUser: {
    id: 0,
    email: "",
    username: "",
    profileImage: "",
    folders: [],
  },
};

export default (
  state: UserStateType = initialState,
  action: UserDispatchType
): UserStateType => {
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
    case EDIT_FOLDER_SUCCESS:
      const editedId = action.payload.id;
      const editedFolders = state.loggedUser.folders.map(folder => {
        return folder.id === editedId ? action.payload : folder
      });
      return { ...state, loggedUser: { ...state.loggedUser, folders: editedFolders } };
    case EDIT_FOLDER_FAIL:
      return { ...state };
    case DELETE_FOLDER_SUCCESS:
      const deletedId = action.payload;
      const deleteFolders = state.loggedUser.folders.filter(folder => {
        return folder.id !== deletedId
      });
      return { ...state, loggedUser: { ...state.loggedUser, folders: deleteFolders } };
    case DELETE_FOLDER_FAIL:
      return { ...state };
    default:
      return state;
  }
};
