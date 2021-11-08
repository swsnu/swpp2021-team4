import axios from "axios";
import * as Redux from "redux";
import { GET_POST_SUCCESS, GET_POST_FAIL } from "../actionTypes";
import { PostDispatchType, PostType } from "./postInterfaces";

export const getPostAction = (postId: number) => {
  return (dispatch: Redux.Dispatch<PostDispatchType>) => {
    return axios
      .get<PostType>(`/post/${postId}/`)
      .then((res) => dispatch({ type: GET_POST_SUCCESS, payload: res.data }))
      .catch(() => dispatch({ type: GET_POST_FAIL }));
  };
};
