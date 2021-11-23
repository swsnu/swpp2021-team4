import {
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  CART_POST_SUCCESS,
  CART_POST_FAIL,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
} from "../actionTypes";
import { Folder } from "../User/userInterfaces";
import { PostDispatchType, PostType, SearchType } from "./postInterfaces";

export type PostStateType = {
  posts: PostType[];
  search: SearchType[];
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
    comments: [],
    days: 0,
    folder_id: 0,
    folder_name: "",
    is_shared: false,
    location: "",
    places: [],
    season: "",
    theme: "",
    title: "",
    like_counts: 0,
    liked: false,
  },
  selectedFolder: {
    id: 0,
    name: "",
  },

  search: [],
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
    // case GET_POST_LIKE_SUCCESS:
    //   return{...state,detailedPost:{...state, likeCounts:action.payload.likeCounts, }}
    case CART_POST_SUCCESS:
      return { ...state, selectedFolder: action.payload };
    case CART_POST_FAIL:
      return { ...state };
    case SEARCH_SUCCESS:
      return { ...state, search: action.payload };
    case SEARCH_FAIL:
      return { ...state };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        detailedPost: { ...state.detailedPost, comments: action.payload },
      };
    case GET_COMMENTS_FAIL:
      return { ...state };
    default:
      return { ...state };
  }
};
