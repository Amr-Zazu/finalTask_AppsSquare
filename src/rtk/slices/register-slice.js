import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
  initialState: {
    isLogin: false,
    token: "",
    user_name: "",
    email: "",
    phone: "",
  },
  name: "registerSlice",
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      return state;
    },
    logout: (state, action) => {
      state.isLogin = false;
      return state;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      return state;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
      return state;
    },
    setUserName: (state, action) => {
      state.user_name = action.payload;
      return state;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
      return state;
    },
  },
});

export const { login, logout, setToken, setEmail, setUserName, setPhone } =
  registerSlice.actions;

export default registerSlice.reducer;
