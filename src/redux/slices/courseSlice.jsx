import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCourseService,
  createCourseService,
  getCourseServiceById,
  deleteCourseServiceById,
} from "../../services/courseService";

// Fetch all courses
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCourseService();
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch courses");
    }
  }
);

// Create a new course
export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createCourseService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create course");
    }
  }
);

// Fetch a course by ID
export const getCourseById = createAsyncThunk(
  "courses/getCourseById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getCourseServiceById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch course");
    }
  }
);

// Delete a course by ID
export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCourseServiceById(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete course");
    }
  }
);

// Course slice
const courseSlice = createSlice({
  name: "courses",
  initialState: {
    data: [],
    selectedCourse: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || [];
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(getCourseById.fulfilled, (state, action) => {
        state.selectedCourse = action.payload;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.data = state.data.filter((course) => course._id !== action.payload);
      });
  },
});

export default courseSlice.reducer;
