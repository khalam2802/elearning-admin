import { createSlice } from "@reduxjs/toolkit";
import { localServ } from "../services/localStore";

const initialState = {
  userInfo: localServ.getUser(),
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setLogIn: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const {setLogIn} = userSlice.actions;

export default userSlice.reducer;
