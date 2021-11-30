import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { connectRouter } from "connected-react-router";
import { history, middlewares } from "../store/store";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const getMockUserReducer = jest.fn(
  (initialState) =>
    (state = initialState, action: { type: any }) => {
      switch (action.type) {
        default:
          break;
      }
      return state;
    }
);

const getMockPostReducer = jest.fn(
  (initialState) =>
    (state = initialState, action: { type: any }) => {
      switch (action.type) {
        default:
          break;
      }
      return state;
    }
);

export const getMockStore = (initialState?: any) => {
  const userReducer = getMockUserReducer(initialState ? initialState : {
    loggedUser: {
      id: 0,
      email: "",
      username: "",
      profile_image: "",
      folders: [],
    },
  });

  const postReducer = getMockPostReducer(initialState ? initialState : {
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
    },
    selectedFolder: {
      id: 0,
      name: "",
    },

    search: [
      {
        author_id: 4,
        author_name: "username",
        comment_count: 0,
        created_at: "2021-11-10T20:43:42Z",
        id: 9,
        is_shared: true,
        like_count: 2,
        thumbnail_image:
          "/media/thumbnail_image/2021/11/10/28493cc3a2ba4eadb4fd0d10c28957ef.jpg",
        title: "겨울강릉",
      },
    ],
    likeSorted: [],
    dateSorted: [],
  });

  const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    router: connectRouter(history),
  });
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const mockStore = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  return mockStore;
};
