import { useSelector } from "react-redux";
import { RootReducerType } from "../store/store";
import { PostStateType } from "../store/Post/postReducer";

const initialState: PostStateType = {
  posts: [],
  detailedPost: {
    id: 0,
    header_image: "",
    thumbnail_image: "",
    // created_at: "",
    // updated_at: "",
    author_id: 0,
    author_name: "",
    availableWithoutCar: false,
    comments: [],
    days: 0,
    folder_id: 0,
    folder_name: "",
    is_shared: false,
    location: "",
    places: [],
    season: "",
    theme: "",
    title: "",
    like_counts: 0,
    liked: false,
    pathList: [],
  },
  selectedFolder: {
    id: 0,
    name: "",
  },
  search: [],
  likeSorted: [],
  dateSorted: [],
};
export const usePostState = () => {
  const post = useSelector(
    (state: RootReducerType) =>
      state.post.detailedPost || initialState.detailedPost
  );
  return post;
};
