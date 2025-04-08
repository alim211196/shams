import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getInstructorService,
  createInstructorService,
  getInstructorServiceById,
  deleteInstructorServiceById,
} from "../../services/instructorService";

// Fetch all instructors
export const fetchInstructors = createAsyncThunk(
  "instructors/fetchInstructors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getInstructorService();
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch instructors");
    }
  }
);

// Create a new instructor
export const createInstructor = createAsyncThunk(
  "instructors/createInstructor",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createInstructorService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create instructor");
    }
  }
);

// Fetch an instructor by ID
export const getInstructorById = createAsyncThunk(
  "instructors/getInstructorById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getInstructorServiceById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch instructor");
    }
  }
);

// Delete an instructor by ID
export const deleteInstructor = createAsyncThunk(
  "instructors/deleteInstructor",
  async (id, { rejectWithValue }) => {
    try {
      await deleteInstructorServiceById(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete instructor");
    }
  }
);

// Instructor slice
const instructorSlice = createSlice({
  name: "instructors",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructors.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || [];
      })
      .addCase(fetchInstructors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createInstructor.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(getInstructorById.fulfilled, (state, action) => {
        state.selectedInstructor = action.payload;
      })
      .addCase(deleteInstructor.fulfilled, (state, action) => {
        state.data = state.data.filter((instructor) => instructor._id !== action.payload);
      });
  },
});

export default instructorSlice.reducer;
