import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { connectRouter } from "connected-react-router";
import { history, middlewares } from "../store/store";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const getMockUserReducer = jest.fn((initialState) => (state = initialState) => {
  return state;
});

const getMockPostReducer = jest.fn((initialState) => (state = initialState) => {
  return state;
});

export const getMockStore = (initialState: any) => {
  const mockUserReducer = getMockUserReducer(initialState);
  const mockPostReducer = getMockPostReducer(initialState);
  const rootReducer = combineReducers({
    user: mockUserReducer,
    post: mockPostReducer,
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

export const stubInitialState = {
  user: {
      loggedUser: {
          id: 1,
          email: "email",
          username: "username",
          profile_image: "",
          folders: [],
      }
  },
  post: {
      posts: [
          {
              id: 1,
              header_image: "ex1",
              thumbnail_image: "ex1",
              author_id: 1,
              author_name: "ex1",
              availableWithoutCar: true,
              comments: [
                  {
                      username: "ex1",
                      content: "ex1",
                      profile_image: "ex1",
                      id: 1,
                      created_at: "ex1",
                      author_id: "1,",
                  },
              ],
              days: 1,
              folder_id: 1,
              folder_name: "ex1",
              is_shared: true,
              location: "ex1",
              places: [],
              season: "ex1",
              theme: "ex1",
              title: "ex1",
              like_counts: 1,
              liked: true,
          },
      ],
      detailedPost: {
          id: 1,
          header_image: "ex1",
          thumbnail_image: "ex1",
          author_id: 1,
          author_name: "ex1",
          availableWithoutCar: true,
          comments: [
              {
                  username: "ex1",
                  content: "ex1",
                  profile_image: "ex1",
                  id: 1,
                  created_at: "ex1",
                  author_id: "1,",
              },
          ],
          days: 1,
          folder_id: 1,
          folder_name: "ex1",
          is_shared: true,
          location: "ex1",
          places: [],
          season: "ex1",
          theme: "ex1",
          title: "ex1",
          like_counts: 1,
          liked: true,
      },
      selectedFolder: {
          id: 1,
          name: "ex1",
      },
      search: [],
      likeSorted: [],
      dateSorted: [],
  },
};
