import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addEditRoleService,
  deleteRoleServiceId,
  getAllRolesService,
} from "../../services/roleService";

// // Async thunk to fetch roles
// export const fetchRoles = createAsyncThunk("roles/fetchRoles", async (_, { rejectWithValue }) => {
//     try {
//       const response =await getRoleService();
//       return response.data.result;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to fetch roles");
//     }
//   });

// Async thunk to fetch roles
export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllRolesService();
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch roles");
    }
  }
);

// Async thunk to create a role
export const createRole = createAsyncThunk(
  "roles/createRole",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addEditRoleService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create role");
    }
  }
);

// Async thunk to delete a role by ID
export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (id, { rejectWithValue }) => {
    try {
      await deleteRoleServiceId(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete role");
    }
  }
);

//   // Async thunk to delete a role by ID
//   export const deleteRole = createAsyncThunk("roles/deleteRole", async (id, { rejectWithValue }) => {
//     try {
//       await deleteRoleServiceId(id);
//       return id;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to delete role");
//     }
//   });

//   // Role slice
// const roleSlice = createSlice({
//     name: "roles",
//     initialState: {
//       data: [],
//       loading: false,
//       error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//       builder
//         .addCase(fetchRoles.pending, (state) => {
//           state.loading = true;
//           state.error = null;
//         })
//         .addCase(fetchRoles.fulfilled, (state, action) => {
//           state.loading = false;
//           state.data = action.payload || [];
//         })
//         .addCase(fetchRoles.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.payload;
//         })
//         .addCase(createRole.fulfilled, (state, action) => {
//           state.data.push(action.payload);
//         })
//         .addCase(deleteRole.fulfilled, (state, action) => {
//           state.data = state.data.filter((role) => role.id !== action.payload);
//         });
//     },
//   });

//   export default roleSlice.reducer;
