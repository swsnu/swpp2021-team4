import axios from "axios";
import * as Redux from "redux";
import {
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  CART_POST_SUCCESS,
  CART_POST_FAIL,
} from "../actionTypes";
import { Folder } from "../User/userInterfaces";
import { PostDispatchType, PostType, SearchType } from "./postInterfaces";
interface SearchForm {
  keyword: string;
  season: string;
  location: string;
  days: string;
  theme: string;
  transportation: string;
}

export const getPostsAction = () => {
  return (dispatch: Redux.Dispatch<PostDispatchType>) => {
    return axios
      .get<PostType[]>("/post/")
      .then((res) => dispatch({ type: GET_POSTS_SUCCESS, payload: res.data }))
      .catch(() => dispatch({ type: GET_POSTS_FAIL }));
  };
};

export const getPostAction = (postId: number) => {
  return (dispatch: Redux.Dispatch<PostDispatchType>) => {
    return axios
      .get<PostType>(`/post/${postId}/`)
      .then((res) => dispatch({ type: GET_POST_SUCCESS, payload: res.data }))
      .catch(() => dispatch({ type: GET_POST_FAIL }));
  };
};

export const cartPostAction = (postId: number, folderId: number) => {
  return (dispatch: Redux.Dispatch<PostDispatchType>) => {
    return axios
      .post<{ folder: Folder }>(`/post/${postId}/cart/${folderId}/`)
      .then((res) =>
        dispatch({ type: CART_POST_SUCCESS, payload: res.data.folder })
      )
      .catch(() => dispatch({ type: CART_POST_FAIL }));
  };
};

export const searchAction = (
  searchForm: SearchForm,
) => {
  return (dispatch: Redux.Dispatch<PostDispatchType>) => {
    console.log(searchForm);
    return axios
      .post<{ result: SearchType[] }>(`/post/search/`, searchForm)
      .then((res) => {
        dispatch({ type: SEARCH_SUCCESS, payload: res.data.result });
      })
      .catch(() => dispatch({ type: SEARCH_FAIL }));
  };
};
