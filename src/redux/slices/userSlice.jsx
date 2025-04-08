import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserDetailsService } from "../../services/staffService";

// Async thunk for fetching user details
export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getUserDetailsService(userId);
      const { permissions, ...userDataWithoutPermissions } = response.data; // Extract permissions

      // Store permissions in localStorage
      localStorage.setItem("permissions", JSON.stringify(permissions || []));

      return {
        userData: userDataWithoutPermissions,
        userPermissions: permissions || [],
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    userPermissions: JSON.parse(localStorage.getItem("permissions")) || [], // Load from localStorage
    processing: false,
    error: null,
  },
  reducers: {
    clearUserData: (state) => {
      state.userData = null;
      state.userPermissions = [];
      state.error = null;
      state.processing = false;
      localStorage.removeItem("permissions"); // Clear permissions on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.processing = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.processing = false;
        state.userData = action.payload.userData;
        state.userPermissions = action.payload.userPermissions;

        // Update localStorage whenever permissions change
        localStorage.setItem(
          "permissions",
          JSON.stringify(action.payload.userPermissions || [])
        );
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.processing = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
