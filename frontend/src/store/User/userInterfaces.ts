import {
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAIL,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  EDIT_FOLDER_SUCCESS,
  EDIT_FOLDER_FAIL,
} from '../actionTypes';

export interface UserType {
  id: number,
  email: string,
  username: string,
  profileImage: string
  folders: Folder[]
}

export interface Folder {
  id: number,
  name: string
}

export interface SigninSuccess {
  type: typeof SIGNIN_SUCCESS
  payload: UserType
}

export interface SigninFail {
  type: typeof SIGNIN_FAIL
}

export interface SignoutSuccess {
  type: typeof SIGNOUT_SUCCESS
}

export interface SignoutFail {
  type: typeof SIGNOUT_FAIL
}

export interface EditProfileSuccess {
  type: typeof EDIT_PROFILE_SUCCESS
  payload: UserType
}

export interface EditProfileFail {
  type: typeof EDIT_PROFILE_FAIL
}

export interface EditFolderSuccess {
  type: typeof EDIT_FOLDER_SUCCESS
  payload: Folder
}

export interface EditFolderFail {
  type: typeof EDIT_FOLDER_FAIL
}

export type UserDispatchType =
  SigninSuccess |
  SigninFail |
  SignoutSuccess |
  SignoutFail |
  EditProfileSuccess |
  EditProfileFail |
  EditFolderSuccess |
  EditFolderFail;
