import {
  GET_POST_SUCCESS,
  GET_POST_FAIL
} from '../actionTypes';

import {
  PostDispatchType,
  PostType
} from './postInterfaces';

export type PostStateType = {
  detailedPost: PostType
}

const initialState: PostStateType = {
  detailedPost: {
    title: '',
    author: {
      id: 0,
      email: '',
      username: '',
      profileImage: '',
      folders: []
    },
    folderId: 0,
    days: 0,
    headerImage: '',
    thumbnailImage: '',
    createdAt: '',
    updatedAt: '',
    theme: '',
    season: '',
    isShared: false,
    availableWithoutCar: false,
  }
}

export default (state: PostStateType = initialState, action: PostDispatchType): PostStateType => {
  switch (action.type) {
    case GET_POST_SUCCESS:
      return { ...state, detailedPost: action.payload };
    case GET_POST_FAIL:
      return { ...state };
    default:
      return { ...state };
  }
}
