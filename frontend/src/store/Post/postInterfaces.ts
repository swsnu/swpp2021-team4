import { GET_POST_SUCCESS, GET_POST_FAIL } from "../actionTypes";
import { UserType } from "../User/userInterfaces";

export interface PostType {
  title: string;
  author: UserType;
  folderId: number;
  folderName: string;
  days: number;
  location: string;
  headerImage: string;
  thumbnailImage: string;
  createdAt: string;
  updatedAt: string;
  theme: string;
  season: string;
  isShared: boolean;
  availableWithoutCar: boolean;
}

export interface PlaceInfoType {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  description: string;
}

export interface PlaceType {
  post: PostType;
  place: PlaceInfoType;
  description: string;
  day: number;
}

export interface CommentType {
  author: UserType;
  post: PostType;
  content: string;
  createdAt: string;
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
