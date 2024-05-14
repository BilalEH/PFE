import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "axios";

export const fetchParents = createAsyncThunk(
  'parents/fetch',
  async () => {
    try {
      const response = await axiosInstance.get("http://localhost:8000/parents");
      return response.data.parents;
    } catch (error) {
      throw error.message;
    }
  }
);

const initialState = {
  parents: [],
  loading: false,
  error: null,
};

const parentSlice = createSlice({
  name: 'parents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParents.fulfilled, (state, action) => {
        state.loading = false;
        state.parents = action.payload;
        state.error = null;
      })
      .addCase(fetchParents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default parentSlice.reducer;
export const { } = parentSlice.actions;
