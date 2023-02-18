import thunk from "redux-thunk";

import { legacy_createStore, combineReducers, applyMiddleware } from "redux";

import { authReducer } from "./auth/auth.reducer";
import blogReducer from "./blogs/blog.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
