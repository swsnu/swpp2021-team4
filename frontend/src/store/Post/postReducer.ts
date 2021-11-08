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
    folderId: 0, // folderName 바로 알려줄 수는 없는지?
    //location은 어디서 받아오는지?
    days: 0,
    headerImage: '',
    thumbnailImage: '',
    createdAt: '',
    updatedAt: '',
    theme: '',// lover로 렌더됨
    season: '',
    //Season여러 개 받도록 해야 하지 않는지?
    //sum으로 렌더됨
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
