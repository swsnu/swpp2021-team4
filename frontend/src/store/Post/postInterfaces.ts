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
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAIL,
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
  pathList: PathType[];
}

export interface SimplePostType {
  id: number;
  thumbnail_image: string;
  title: string;
  author_name: string;
  author_id: number;
  like_count: number;
  comment_count: number;
  is_shared: boolean;
}

export interface HeaderPostType {
  id: number;
  thumbnail_image: string;
  folder_name?: string;
  title: string;
  author_name: string;
  author_id: number;
  is_shared: boolean;
  location: string;
  days: number;
  season: string;
  theme: string;
  like_counts: number;
  comments?: Array<CommentType>;
  comment_counts?: number;
  availableWithoutCar: boolean;
  liked?: boolean;
  created_at: string;
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
  kakao_id: number;
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
  index?: number;
}

export interface PlaceDayType {
  place: PlaceType;
  day: number;
}

// export interface SimplePlaceType {
//   id: number;
//   name: string;
//   description: string;
// }

export interface CommentType {
  username: string;
  content: string;
  profile_image: string;
  id: number;
  created_at: string;
  author_id: number;
}

export interface PathType {
  from_place_id: number;
  id: number;
  post_id: number;
  to_place_id: number;
  transportation: "car";
}

export interface ServerPathType {
  // path Object type which used in server
  id: number;
  post_id: number;
  from_place_id: number;
  to_place_id: number;
  transportation: 'car' | 'pub' | 'vic' | 'wal'
}

export interface PathValueType {
  to: string;
  transportation: "car" | "pub" | "vic" | "wal";
}

export interface PathListType {
  [from: string]: {
    to: string;
    transportation: "car" | "pub" | "vic" | "wal";
  };
}

export interface SearchType {
  id: number;
  thumbnail_image: string;
  author_name: string;
  author_id: number;
  title: string;
  is_shared: boolean;
}

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

export interface CreatePostSuccess {
  type: typeof CREATE_POST_SUCCESS
  payload: PostType
}

export interface CreatePostFail {
  type: typeof CREATE_POST_FAIL;
}

export interface SearchSuccess {
  type: typeof SEARCH_SUCCESS;
  ordinary: SimplePostType[];
  like: SimplePostType[];
  date: SimplePostType[];
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

export interface DeletePostSuccess {
  type: typeof DELETE_POST_SUCCESS;
}

export interface DeletePostFail {
  type: typeof DELETE_POST_FAIL;
}

export interface EditPostSuccess {
  type: typeof EDIT_POST_SUCCESS;
  payload: PostType
}

export interface EditPostFail {
  type: typeof EDIT_POST_FAIL;
}

export type PostDispatchType =
  | GetPostsSuccess
  | GetPostsFail
  | GetPostSuccess
  | GetPostFail
  | CartPostSuccess
  | CartPostFail
  | CreatePostSuccess
  | CreatePostFail
  | SearchSuccess
  | SearchFail
  | GetCommentsSucess
  | GetCommentsFail
  | DeletePostSuccess
  | DeletePostFail
  | EditPostSuccess
  | EditPostFail;
