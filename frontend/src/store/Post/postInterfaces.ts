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

export interface PostType {
  id: number;
  title: string;
  author_name: string;
  author_id: number;
  folder_id: number;
  folder_name: string;
  days: number;
  location: string;
  header_image: string;
  thumbnail_image: string;
  // created_at: string;
  // updated_at: string;
  theme: string;
  season: string;
  is_shared: boolean;
  availableWithoutCar: boolean;
  comments: CommentType[];
  places: PlaceType[];
  like_counts: number;
  liked: boolean;
}

export interface SimplePostType {
  id: number;
  thumbnail_image: string;
  title: string;
  author: string;
  author_id: number;
  like_count: number;
  comment_count: number;
}

export interface PlaceInfoType {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  description: string;
}

export interface PlaceType {
  id: number;
  name: string;
  post_id: number;
  description: string;
  day: number;
  folder_id: number;
  latitude?: string;
  longitude?: string;
  lat: string;
  lon: string;
  homepage: string;
  phone_number: string;
  address: string;
  category: string;
}

export interface PlaceDayType {
  day: number | string;
  place: PlaceType;
}

export interface CommentType {
  username: string;
  content: string;
  profile_image: string;
  id: number;
  created_at: string;
  author_id: number;
}

export interface PathType {
  from: PlaceType;
  to: PlaceType;
  transportation: string;
}

<<<<<<< HEAD
export interface PathListType {
  [from: string]: {
    to: string;
    transportation: "car" | "pub" | "vic" | "wal";
  };
}

=======
export interface SearchType {
  id: number;
  thumbnail_image: string;
  author_name: string;
  author_id: number;
  title: string;
  is_shared: boolean;
}
>>>>>>> 8460d3a3bd823c9947e950d367ad76067683865d
export interface GetPostsSuccess {
  type: typeof GET_POSTS_SUCCESS;
  payload: PostType[];
}

export interface GetPostsFail {
  type: typeof GET_POSTS_FAIL;
}

export interface GetPostSuccess {
  type: typeof GET_POST_SUCCESS;
  payload: PostType;
}

export interface GetPostFail {
  type: typeof GET_POST_FAIL;
}

export interface CartPostSuccess {
  type: typeof CART_POST_SUCCESS;
  payload: Folder;
}

export interface CartPostFail {
  type: typeof CART_POST_FAIL;
}

<<<<<<< HEAD
=======
export interface SearchSuccess {
  type: typeof SEARCH_SUCCESS;
  ordinary: SearchType[];
  like: SearchType[];
  date: SearchType[];
}
export interface SearchFail {
  type: typeof SEARCH_FAIL;
}

export interface GetCommentsSucess {
  type: typeof GET_COMMENTS_SUCCESS;
  payload: CommentType[];
}

export interface GetCommentsFail {
  type: typeof GET_COMMENTS_FAIL;
}

>>>>>>> 8460d3a3bd823c9947e950d367ad76067683865d
export type PostDispatchType =
  | GetPostsSuccess
  | GetPostsFail
  | GetPostSuccess
  | GetPostFail
  | CartPostSuccess
<<<<<<< HEAD
  | CartPostFail;
=======
  | CartPostFail
  | SearchSuccess
  | SearchFail
  | GetCommentsSucess
  | GetCommentsFail;
>>>>>>> 8460d3a3bd823c9947e950d367ad76067683865d
