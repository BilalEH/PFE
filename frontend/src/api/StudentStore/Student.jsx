import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from './../axios';
import { toast } from 'react-toastify';
import { StyleToast } from './../../layouts/Layout';

export const StudentsSlice = createSlice({
    name: 'studentsSlice',
    initialState: {
        status: '', // Status of asynchronous operation
        student: {}, // Student data
        parents: [], // Array to hold parent data
        courses: [], // Array to hold course data
        studentClasses: [], // Array to hold student class data
        action_status: '', // Status of specific action
    },
    extraReducers: (builder) => {
        // Reducers for handling asynchronous actions

        // Reducer for getting courses
        builder.addCase(SGetCourses.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(SGetCourses.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.courses = action.payload;
        });
        builder.addCase(SGetCourses.rejected, (state) => {
            state.status = 'failed';
        });

        // Reducer for getting student's parents list
        builder.addCase(StudentParentsList.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(StudentParentsList.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.parents = action.payload;
        });
        builder.addCase(StudentParentsList.rejected, (state) => {
            state.status = 'failed';
        });

        // Reducer for getting student classes list
        builder.addCase(SStudentClasses.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(SStudentClasses.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            state.studentClasses = action.payload;
        });
        builder.addCase(SStudentClasses.rejected, (state) => {
            state.action_status = 'failed';
        });
    }
});

// Thunk to fetch courses for a student
export const SGetCourses = createAsyncThunk(
    'Student/GetCourses',
    async () =>{
        let data=null;
        await axiosInstance.get('/api/courses')
        .catch(err=>{
            toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        .then((res) => {
            return data=res.data.courses;
        })
        return data
    }
);

// Thunk to fetch student's parents list
export const StudentParentsList = createAsyncThunk(
    'Student/StudentParentsList',
    async (id) => {
        try {
            const response = await axiosInstance.get(`/api/student/parents/${id}`);
            return response.data.parents;
        } catch (error) {
            toast.error(`X ${error.response.data.message}`, StyleToast);
            throw error;
        }
    }
);

// Thunk to fetch student classes for a student
export const SStudentClasses = createAsyncThunk(
    'Student/SStudentClasses',
    async (id) => {
        try {
            const response = await axiosInstance.get(`/api/students/getClasses/${id}`);
            return response.data.classes;
        } catch (error) {
            toast.error(`X ${error.response.data.message}`, StyleToast);
            throw error;
        }
    }
);

export default StudentsSlice;
