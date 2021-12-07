import { useSelector } from "react-redux";
import { RootReducerType } from "../store/store";
import { PostStateType } from "../store/Post/postReducer";

const initialState: PostStateType = {
  posts: [],
  search: [],
  likeSorted: [],
  dateSorted: [],
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
};
export const usePostsState = () => {
  const posts = useSelector(
    (state: RootReducerType) => state.post.posts || initialState.posts
  );
  return posts;
};

export const useSearchPostState = () => {
  return useSelector(
    (state: RootReducerType) => state.post.search || initialState.search
  );
}
export const useLikeSearchPostState = () => {
  return useSelector(
    (state: RootReducerType) => state.post.likeSorted || initialState.likeSorted
  );
}
export const useDateSearchPostState = () => {
  return useSelector(
    (state: RootReducerType) => state.post.dateSorted || initialState.dateSorted
  );
};
