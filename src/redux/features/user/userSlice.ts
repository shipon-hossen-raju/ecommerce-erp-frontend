import { createSlice } from "@reduxjs/toolkit";
import type { IUserAccount } from "../../../types/user.type";

type TInitialState = {
  user: IUserAccount | null;
};

const initialState: TInitialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { SetUser } = userSlice.actions;

const userSliceReducer = userSlice.reducer;
export default userSliceReducer;
