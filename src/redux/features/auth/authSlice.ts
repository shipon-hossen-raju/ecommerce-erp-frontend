import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  LoginError: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SetLoginError: (state, action) => {
      state.LoginError = action.payload;
    },
  },
});

export const { SetLoginError } = authSlice.actions;

const authSliceReducer = authSlice.reducer;
export default authSliceReducer;
