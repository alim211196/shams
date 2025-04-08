import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginService } from "../../services/authService";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { dispatch }) => {
    dispatch(loginStart());
    try {
      const response = await loginService(userData);
      dispatch(loginSuccess({ user: response?.data }));
      return response.data;
    } catch (error) {
      dispatch(loginFailure(error.message));
      throw error;
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
