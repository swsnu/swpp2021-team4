import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import { history, middlewares } from "../store/store";
import * as actionTypes from "../store/actionTypes";
import postReducer from "../store/Post/postReducer";
import userReducer from "../store/User/userReducer";
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const getMockTodoReducer = jest.fn(
  (initialState) =>
    (state = initialState, action: { type: any }) => {
      switch (action.type) {
        default:
          break;
      }
      return state;
    }
);

export const getMockStore = () => {
  const postReducer = getMockTodoReducer({
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
