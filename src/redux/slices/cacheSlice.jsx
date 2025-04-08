import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: null,
  loading: true,
  error: false,
};

const cacheSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.authData = action.payload;
      state.loading = false;
      state.error = false;
    },
    setAuthError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { setAuthData, setAuthError } = cacheSlice.actions;
export default cacheSlice.reducer;
