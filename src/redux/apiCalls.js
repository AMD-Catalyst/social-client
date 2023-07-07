import { loginStart, loginSuccess, loginFailure } from "./userRedux";
import { publicRequest } from "../api/axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const result = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(result.data));
  } catch (error) {
    console.log(error.response);
    dispatch(loginFailure(error.response.data.message));
  }
};
