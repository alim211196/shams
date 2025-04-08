import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAdminService,
  addEditAdminService,
  getAdminServiceId,
  deleteAdminServiceId,
} from "../../services/adminService";

// Fetch all admins
export const fetchAdmins = createAsyncThunk(
  "admins/fetchAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAdminService();
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch admins");
    }
  }
);

// Create a new admin
export const createAdmin = createAsyncThunk(
  "admins/createAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addEditAdminService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create admin");
    }
  }
);

// Fetch an admin by ID
export const getAdminById = createAsyncThunk(
  "admins/getAdminById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getAdminServiceId(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch admin");
    }
  }
);

// Delete an admin by ID
export const deleteAdmin = createAsyncThunk(
  "admins/deleteAdmin",
  async (id, { rejectWithValue }) => {
    try {
      await deleteAdminServiceId(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete admin");
    }
  }
);

// Admin slice
const adminSlice = createSlice({
  name: "admins",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || [];
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(getAdminById.fulfilled, (state, action) => {
        state.selectedAdmin = action.payload;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.data = state.data.filter((admin) => admin._id !== action.payload);
      });
  },
});

export default adminSlice.reducer;
