import { GET_POST_SUCCESS, GET_POST_FAIL } from "../actionTypes";

import { PostDispatchType, PostType } from "./postInterfaces";

export type PostStateType = {
  detailedPost: PostType;
};

const initialState: PostStateType = {
  detailedPost: {
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
  }
};

export default (
  state: PostStateType = initialState,
  action: PostDispatchType
): PostStateType => {
  switch (action.type) {
    case GET_POST_SUCCESS:
      return { ...state, detailedPost: action.payload };
    case GET_POST_FAIL:
      return { ...state };
    default:
      return { ...state };
  }
};
