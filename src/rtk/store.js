import { configureStore } from "@reduxjs/toolkit";

import loginSlice from "./slices/register-slice";

export const store = configureStore({
  reducer: {
    register: loginSlice,
    // isToken: tokenSlice,
  },
});
