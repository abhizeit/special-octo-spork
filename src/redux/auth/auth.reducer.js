import {
  authLogout,
  loginFail,
  loginRequest,
  loginSuccess,
  signupFail,
  signupRequest,
  signupSuccess,
} from "./autn.types";

let token = localStorage.getItem("token") || "";
let rToken = localStorage.getItem("rToken") || "";
const initialState = {
  isAuth: !!token,
  token,
  rToken,
  isLoading: false,
  isError: false,
  isSignedUp: false,
};
export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case loginRequest: {
      return {
        ...initialState,
        isLoading: true,
      };
    }
    case loginSuccess: {
      localStorage.setItem("token", payload.token);
      localStorage.setItem("rToken", payload.rToken);
      return {
        ...state,
        token: payload.token,
        rToken: payload.rToken,
        isAuth: true,
        isLoading: false,
        isError: false,
        isSignedUp: false,
      };
    }
    case loginFail: {
      return {
        ...initialState,
        isError: true,
      };
    }
    case signupRequest: {
      return {
        ...initialState,
        isLoading: true,
      };
    }
    case signupSuccess: {
      return {
        ...state,
        isAuth: false,
        isLoading: false,
        isError: false,
        isSignedUp: true,
      };
    }
    case signupFail: {
      return {
        ...initialState,
        isError: true,
      };
    }
    case authLogout: {
      localStorage.removeItem("token");
      localStorage.removeItem("rToken");
      return {
        ...state,
        isAuth: false,
        token: "",
        rToken: "",
        isLoading: false,
        isError: false,
        isSignedUp: false,
      };
    }
    default: {
      return state;
    }
  }
};
