import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "userLogin",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
},
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
} = loginSlice.actions;
export default loginSlice.reducer;