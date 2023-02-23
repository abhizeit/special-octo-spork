import axios from "axios";
import {
  authLogout,
  loginFail,
  loginRequest,
  loginSuccess,
  signupFail,
  signupRequest,
  signupSuccess,
} from "./autn.types";

const api = process.env.REACT_APP_BASE_URI;

export const login =
  ({ payload, toaster }) =>
  async (dispatch) => {
    dispatch({ type: loginRequest });
    try {
      const { data } = await axios.post(`${api}/users/login`, payload);
      if (data && !data.error) {
        dispatch({ type: loginSuccess, payload: data });
        toaster.successToast();
      } else if (data.error) {
        dispatch({ type: loginFail });
        toaster.failToast(data.message);
      }
    } catch (e) {
      console.log(e.message);
      dispatch({ type: loginFail });
      toaster.failToast(e.message);
    }
  };
export const singup =
  ({ payload, toaster }) =>
  async (dispatch) => {
    dispatch({ type: signupRequest });
    try {
      const { data } = await axios.post(`${api}/users/signup`, payload);
      if (data && !data.error) {
        dispatch({ type: signupSuccess });
        toaster.successToast();
      } else {
        dispatch({ type: signupFail });
        toaster.failToast();
      }
    } catch (e) {
      dispatch({ type: signupFail });
      toaster.failToast();
    }
  };

export const logout = () => ({ type: authLogout });
