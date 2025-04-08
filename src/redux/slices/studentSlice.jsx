import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getStudentService,
  createStudentService,
  getStudentServiceById,
  deleteStudentServiceById,
} from "../../services/studentService";

// Fetch all students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getStudentService();
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch students");
    }
  }
);

// Create a new student
export const createStudent = createAsyncThunk(
  "students/createStudent",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createStudentService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create student");
    }
  }
);

// Fetch a student by ID
export const getStudentById = createAsyncThunk(
  "students/getStudentById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getStudentServiceById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch student");
    }
  }
);

// Delete a student by ID
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id, { rejectWithValue }) => {
    try {
      await deleteStudentServiceById(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete student");
    }
  }
);

// Student slice
const studentSlice = createSlice({
  name: "students",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || [];
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(getStudentById.fulfilled, (state, action) => {
        state.selectedStudent = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.data = state.data.filter((student) => student._id !== action.payload);
      });
  },
});

export default studentSlice.reducer;
