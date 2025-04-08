import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLanguageService } from "../../services/languageService";

// Async thunk for fetching languages
export const fetchLanguages = createAsyncThunk(
  "languages/fetchLanguages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLanguageService();
      return {
        languages: response?.result?.data || [],
        totalRecords: response?.result?.totalRecords || 0,
        currentPage: response?.result?.currentPage || 1,
        totalPages: response?.result?.totalPages || 1,
        pageSize: response?.result?.pageSize || 10,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching languages"
      );
    }
  }
);

const languageSlice = createSlice({
  name: "languages",
  initialState: {
    languages: [],
    totalRecords: 0,
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.loading = false;
        state.languages = action.payload.languages;
        state.totalRecords = action.payload.totalRecords;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default languageSlice.reducer;
