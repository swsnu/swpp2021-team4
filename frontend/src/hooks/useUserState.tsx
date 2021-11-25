import { useSelector } from "react-redux";
import { RootReducerType } from "../store/store";
import { UserStateType } from "../store/User/userReducer";

const initialState: UserStateType = {
    loggedUser: {
        id: 0,
        email: "",
        username: "",
        profile_image: "",
        folders: [],
    },
};

export const useUserState = () => {
    const user = useSelector(
        (state: RootReducerType) =>
            state.user.loggedUser || initialState.loggedUser
    );
    return user;
};
