import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isFetching: false,
  isError: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      // state.isFetching = true;
      return { ...initialState, isFetching: true };
    },
    loginSuccess: (state, action) => {
      return { ...initialState, currentUser: action.payload };
    },
    loginFailure: (state, action) => {
      return { ...initialState, isError: true, error: action.payload };
    },
    logout: () => initialState,
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
