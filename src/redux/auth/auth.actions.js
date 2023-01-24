import axios from "axios";
import {
  loginFail,
  loginRequest,
  loginSuccess,
  signupFail,
  signupRequest,
  signupSuccess,
} from "./autn.types";

const api = process.env.REACT_APP_BASE_URI;

export const login = (payload) => async (dispatch) => {
  dispatch({ type: loginRequest });
  try {
    const { data } = await axios.post(`${api}/users/login`, payload);
    if (data && !data.error) {
      dispatch({ type: loginSuccess, payload: data });
    } else {
      dispatch({ type: loginFail });
    }
  } catch (e) {
    console.log(e.message);
    dispatch({ type: loginFail });
  }
};
export const singup = (payload) => async (dispatch) => {
  dispatch({ type: signupRequest });
  try {
    const { data } = await axios.post(`${api}/users/login`, payload);
    if (data && !data.error) {
      dispatch({ type: signupSuccess, payload: data });
    } else {
      dispatch({ type: signupFail });
    }
  } catch (e) {
    console.log(e.message);
    dispatch({ type: signupFail });
  }
};
