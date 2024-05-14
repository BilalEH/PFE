import { configureStore } from '@reduxjs/toolkit';
import parentReducer from './parentSlice';

const store = configureStore({
  reducer: {
    parents: parentReducer,
  },
});

export default store;
