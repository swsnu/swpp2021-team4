import axios from "axios";
import * as Redux from "redux";
import {
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAIL,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  ADD_FOLDER_SUCCESS,
  ADD_FOLDER_FAIL,
  EDIT_FOLDER_SUCCESS,
  EDIT_FOLDER_FAIL,
  DELETE_FOLDER_SUCCESS,
  DELETE_FOLDER_FAIL,
} from "../actionTypes";
import { Folder, UserDispatchType, UserType } from "./userInterfaces";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
interface SigninFormType {
  email: string;
  password: string;
}

interface EditFolderFormType {
  folder_name: string;
}

export const signinAction = (
  formData: SigninFormType,
  callbackFunc: (value: boolean) => void
) => {
  return (dispatch: Redux.Dispatch<UserDispatchType>) => {
    return axios
      .post<{ logged_user: UserType }>("/user/signin/", formData)
      .then((res) => {
        dispatch({ type: SIGNIN_SUCCESS, payload: res.data.logged_user });
        localStorage.setItem("isAuthorized", "true");
        callbackFunc(true);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          alert(`로그인 실패\n${err.response.data}`);
        } else {
          alert('로그인이 실패했습니다!');
        }
        dispatch({ type: SIGNIN_FAIL });
      });
  };
};

export const signoutAction = () => {
  return (dispatch: Redux.Dispatch<UserDispatchType>) => {
    return axios
      .post("/user/signout/")
      .then(() => {
        dispatch({ type: SIGNOUT_SUCCESS });
        localStorage.removeItem("isAuthorized");
      })
      .catch(() => dispatch({ type: SIGNOUT_FAIL }));
  };
};

export const editProfileAction = (
  user_id: number,
  formData: any,
  callbackFunc: (value: boolean) => void
) => {
  return (dispatch: Redux.Dispatch<UserDispatchType>) => {
    return axios
      .post<{ logged_user: UserType }>(`/user/${user_id}/edit/`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch({ type: EDIT_PROFILE_SUCCESS, payload: res.data.logged_user });
        callbackFunc(true);
      })
      .catch(() => {
        dispatch({ type: EDIT_PROFILE_FAIL });
      });
  };
};

export const addFolderAction = (
  user_id: number,
  fname: string,
  callbackFunc: (value: boolean) => void,
  callbackFunc2?: (newFolder: Folder) => void
) => {
  return (dispatch: Redux.Dispatch<UserDispatchType>) => {
    return axios
      .post<{ folder: Folder }>(`/user/${user_id}/folder/new/`, { folder_name: fname })
      .then((res) => {
        dispatch({ type: ADD_FOLDER_SUCCESS, payload: res.data.folder });
        callbackFunc(true);

        if (callbackFunc2) {
          callbackFunc2(res.data?.folder);
        }
      })
      .catch(() => {
        dispatch({ type: ADD_FOLDER_FAIL });
      });
  };
};

export const editFolderAction = (
  user_id: number,
  fid: number,
  formData: EditFolderFormType,
  callbackFunc: (value: boolean) => void
) => {
  return (dispatch: Redux.Dispatch<UserDispatchType>) => {
    return axios
      .put<{ folder: Folder }>(`/user/${user_id}/folder/${fid}/edit/`, formData)
      .then((res) => {
        dispatch({ type: EDIT_FOLDER_SUCCESS, payload: res.data.folder });
        callbackFunc(true);
      })
      .catch(() => {
        dispatch({ type: EDIT_FOLDER_FAIL });
      });
  };
};

export const deleteFolderAction = (
  user_id: number,
  fid: number,
) => {
  return (dispatch: Redux.Dispatch<UserDispatchType>) => {
    return axios
      .delete(`/user/${user_id}/folder/${fid}/delete/`)
      .then(() => {
        dispatch({ type: DELETE_FOLDER_SUCCESS, payload: fid });
      })
      .catch(() => {
        dispatch({ type: DELETE_FOLDER_FAIL });
      });
  };
};
