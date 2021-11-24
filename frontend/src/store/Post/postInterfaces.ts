import { GET_POSTS_SUCCESS, GET_POSTS_FAIL, GET_POST_SUCCESS, GET_POST_FAIL, CART_POST_SUCCESS, CART_POST_FAIL, CREATE_POST_SUCCESS, CREATE_POST_FAIL } from "../actionTypes";
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
  comment: CommentType[];
  places: PlaceType[];
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
  day: number|string,
  place: PlaceType
}

export interface CommentType {
  author_id: number;
  content: string;
}

export interface PathType {
  from: PlaceType;
  to: PlaceType;
  transportation: string;
}

export interface PathListType {
  [from: string]: {
    to: string,
    transportation: 'car'|'pub'|'vic'|'wal'
  }
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
  payload: any
}

export interface CreatePostFail {
  type: typeof CREATE_POST_FAIL
}

export type PostDispatchType =
  GetPostsSuccess
  | GetPostsFail
  | GetPostSuccess
  | GetPostFail
  | CartPostSuccess
  | CartPostFail
  | CreatePostSuccess
  | CreatePostFail;
