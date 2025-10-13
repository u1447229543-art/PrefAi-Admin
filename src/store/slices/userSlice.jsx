import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  refreshToken: "",
  _id: "",
  role: "",
  name: "",
  email: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload, "action.payload");
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state._id = action.payload.userInfo._id;
      state.role = action.payload.userInfo.role;
      state.name = action.payload.userInfo.firstName;
      state.email = action.payload.userInfo.email;
    },
    resetUser: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state._id = "";
      state.role = "";
      state.name = "";
      state.email = "";
    }
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer
