import {
  loginFail,
  loginRequest,
  loginSuccess,
  signupFail,
  signupRequest,
  signupSuccess,
} from "./autn.types";

let token = localStorage.getItem("token") || "";
let rTOken = localStorage.getItem("rToken") || "";
const initialState = {
  isAuth: !!token,
  token,
  rTOken,
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
      localStorage.setItem("rToken", payload.rTOken);
      return {
        ...state,
        token: payload.token,
        rTOken: payload.rToken,
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
      localStorage.setItem("token", payload.token);
      localStorage.setItem("rToken", payload.rTOken);
      return {
        ...state,
        token: payload.token,
        rTOken: payload.rToken,
        isLoading: false,
        isError: false,
        isSignedUp: false,
      };
    }
    case signupFail: {
      return {
        ...initialState,
        isError: true,
      };
    }
    default: {
      return state;
    }
  }
};
