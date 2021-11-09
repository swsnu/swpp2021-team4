import { useSelector } from "react-redux";
import { RootReducerType } from "../store/store";
import { PostStateType } from "../store/Post/postReducer";

const initialState: PostStateType = {
  detailedPost: {
    title: "",
    author: {
      id: 0,
      email: "",
      username: "",
      profileImage: "",
      folders: [],
    },
    folderId: 0,
    folderName: "",
    days: 0,
    location: "",
    headerImage: "",
    thumbnailImage: "",
    createdAt: "",
    updatedAt: "",
    theme: "",
    season: "",
    isShared: false,
    availableWithoutCar: false,
  },
};
export const usePostState = () => {
  const post = useSelector(
    (state: RootReducerType) =>
      state.post.detailedPost || initialState.detailedPost
  );
  return post;
};
