import { createSlice } from '@reduxjs/toolkit';
import { fetchEtudiants, fetchStudentData } from './StudentdataAction';

const initialState = {
  etudiants: [],
  studentData: {},
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEtudiants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEtudiants.fulfilled, (state, action) => {
        state.loading = false;
        state.etudiants = action.payload;
        state.error = null;
      })
      .addCase(fetchEtudiants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchStudentData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudentData.fulfilled, (state, action) => {
        state.loading = false;
        state.studentData = action.payload;
        state.error = null;
      })
      .addCase(fetchStudentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default studentSlice.reducer;
