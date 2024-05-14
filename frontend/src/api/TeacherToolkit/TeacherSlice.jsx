import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTeachers = createAsyncThunk('teachers/fetchTeachers', async () => {
  const response = await axios.get('/teachers'); // Adjust the API endpoint
  return response.data;
});

const teacherSlice = createSlice({
  name: 'teachers',
  initialState: {
    teachers: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchTeachers.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchTeachers.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.teachers = action.payload;
    },
    [fetchTeachers.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default teacherSlice.reducer;

export const { selectAll: selectAllTeachers } = teacherAdapter.getSelectors((state) => state.teachers);
