import {
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  CART_POST_SUCCESS,
  CART_POST_FAIL
} from "../actionTypes";
import { Folder } from "../User/userInterfaces";
import { PostDispatchType, PostType } from "./postInterfaces";

export type PostStateType = {
  posts: PostType[];
  detailedPost: PostType;
  selectedFolder: Folder;
};

const initialState: PostStateType = {
  posts: [],
  detailedPost: {
    id: 0,
    header_image: "",
    thumbnail_image: "",
    // created_at: "",
    // updated_at: "",
    author_id: 0,
    author_name: "",
    availableWithoutCar: false,
    comment: [],
    days: 0,
    folder_id: 0,
    folder_name: "",
    is_shared: false,
    location: "",
    places: [],
    season: "",
    theme: "",
    title: "",
  },
  selectedFolder: {
    id: 0,
    name: "",
  }
};

export default (
  state: PostStateType = initialState,
  action: PostDispatchType
): PostStateType => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return { ...state, posts: action.payload };
    case GET_POSTS_FAIL:
      return { ...state };
    case GET_POST_SUCCESS:
      return { ...state, detailedPost: action.payload };
    case GET_POST_FAIL:
      return { ...state };
    case CART_POST_SUCCESS:
      return { ...state, selectedFolder: action.payload };
    case CART_POST_FAIL:
      return { ...state };
    default:
      return { ...state };
  }
};
