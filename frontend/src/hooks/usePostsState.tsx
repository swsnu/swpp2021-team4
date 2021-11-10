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
        author_name: '',
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
    },
};
export const usePostsState = () => {
    const posts = useSelector(
        (state: RootReducerType) =>
            state.post.posts || initialState.posts
    );
    return posts;
};
