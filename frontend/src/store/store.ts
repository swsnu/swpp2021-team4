import * as Redux from 'redux';
import {
  combineReducers,
  createStore,
  compose,
  applyMiddleware
} from "redux";
import thunk from "redux-thunk";

const rootReducer: Redux.Reducer = combineReducers({
});

const store: Redux.Store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(thunk))
);

export default store;
