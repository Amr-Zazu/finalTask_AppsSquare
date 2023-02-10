import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const getToken = createAsyncThunk("loginSlice/getToken", async () => {});

export const registerSlice = createSlice({
  initialState: {
    isLogin: false,
    token: "",
    user_name: "",
    email: "",
    phone: "...",
    // profile_image: "",
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
    // setProfileImage: (state, action) => {
    //   state.profile_image = action.payload;
    //   return state;
    // },
  },
});

export const {
  login,
  logout,
  setToken,
  setEmail,
  setUserName,
  setPhone,
  // setProfileImage,
} = registerSlice.actions;

export default registerSlice.reducer;
