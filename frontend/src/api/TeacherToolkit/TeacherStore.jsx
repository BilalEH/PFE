import { configureStore } from '@reduxjs/toolkit';
import teacherReducer from './teacherSlice';

const store = configureStore({
  reducer: {
    teachers: teacherReducer,
  },
});

export default store;
