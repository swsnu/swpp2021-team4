import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { PostStateType } from "../store/Post/postReducer";

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
export const usePostState = () => {
  const post = useSelector((state: RootState) => state.post.detailedPost || initialState.detailedPost);
  return post;
};
