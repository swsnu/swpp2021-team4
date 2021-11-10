import * as Redux from 'redux';
import {
  combineReducers,
  createStore,
  compose,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
// import logger from 'redux-logger';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './User/userReducer';
import postReducer from './Post/postReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const rootReducer: Redux.Reducer = combineReducers({
  user: userReducer,
  post: postReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Redux.Store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(
    thunk,
    // logger
  ))
);

export type RootReducerType = ReturnType<typeof rootReducer>;

export default store;
