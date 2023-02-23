import thunk from "redux-thunk";

import {
  legacy_createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";

import { authReducer } from "./auth/auth.reducer";
import blogReducer from "./blogs/blog.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
});

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  rootReducer,
  createComposer(applyMiddleware(thunk))
);
