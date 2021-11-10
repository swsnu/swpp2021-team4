import { GET_POST_SUCCESS, GET_POST_FAIL } from "../actionTypes";

export interface PostType {
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
  latitude: string;
  longitude: string;
  homepage: string;
  phone_number: string;
  address: string;
  category: string;
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

export interface GetPostSuccess {
  type: typeof GET_POST_SUCCESS;
  payload: PostType;
}

export interface GetPostFail {
  type: typeof GET_POST_FAIL;
}

export type PostDispatchType = GetPostSuccess | GetPostFail;
