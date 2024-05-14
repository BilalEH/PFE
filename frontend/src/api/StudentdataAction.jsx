// dataActions.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axios";

export const fetchEtudiants = createAsyncThunk(
  'etudiants/fetch',
  async () => {
    try {
      const response = await axiosInstance.get("http://localhost:8000/etudiants");
      return response.data.etudiants;
    } catch (error) {
      throw error.message;
    }
  }
);

export const fetchStudentData = createAsyncThunk(
  'student/fetchData',
  async () => {
    try {
      const response = await axiosInstance.get('http://localhost:8000/api/user');
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);
