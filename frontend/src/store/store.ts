import * as Redux from 'redux';
import {
  combineReducers,
  createStore,
  compose,
  applyMiddleware
} from "redux";
import thunk from "redux-thunk";

import userReducer from './User/userReducer';
import postReducer from './Post/postReducer';

const rootReducer: Redux.Reducer = combineReducers({
  user: userReducer,
  post: postReducer,
});

const store: Redux.Store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(thunk))
);

export default store;
