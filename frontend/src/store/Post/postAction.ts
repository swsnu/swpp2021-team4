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
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,

} from "../actionTypes";
import { Folder } from "../User/userInterfaces";
import { PostDispatchType, PostType, CommentType, SearchType } from "./postInterfaces";
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
  callbackFunc: (value: boolean) => void
) => {
  return (dispatch: Redux.Dispatch<PostDispatchType>) => {
    return axios
      .post<{ordinary: SearchType[], like: SearchType[], date: SearchType[]}>(`/post/search/`, searchForm)
      .then((res) => {
        dispatch({ type: SEARCH_SUCCESS, ordinary: res.data.ordinary, like: res.data.like, date: res.data.date});
        callbackFunc(true);
      })
      .catch(() => dispatch({ type: SEARCH_FAIL }));
  }
}
export const getCommentsAction = (postId: number) => {
  return (dispatch: Redux.Dispatch<PostDispatchType>) => {
    return axios
      .get<CommentType[]>(`/post/${postId}/comment/`)
      .then((res) =>
        dispatch({ type: GET_COMMENTS_SUCCESS, payload: res.data })
      )
      .catch(() => dispatch({ type: GET_COMMENTS_FAIL }));

  };
};