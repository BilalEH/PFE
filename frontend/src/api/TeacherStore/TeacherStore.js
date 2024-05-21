import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from '../axios';
import { toast } from 'react-toastify';
import { StyleToast } from '../../layouts/Layout';

export const TeacherSlice = createSlice({
    name: 'TeacherSlice',
    initialState: {
        status: '', 
        student: {},
        parents: [], 
        courses: [], 
        Teacher:[],
        studentClasses: [],  
        action_status: '',
    },
    extraReducers: (builder) => {
        // Reducers for handling asynchronous actions

        // Reducer for getting courses
        builder.addCase(TGetCourses.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(TGetCourses.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.courses = action.payload;
        });
        builder.addCase(TGetCourses.rejected, (state) => {
            state.status = 'failed';
        });

 

        // // Reducer for getting student classes list
        // builder.addCase(tStudentClasses.pending, (state) => {
        //     state.action_status = 'loading';
        // });
        // builder.addCase(tStudentClasses.fulfilled, (state, action) => {
        //     state.action_status = 'succeeded';
        //     state.studentClasses = action.payload;
        // });
        // builder.addCase(tStudentClasses.rejected, (state) => {
        //     state.action_status = 'failed';
        // });



                // getStudents
                builder.addCase(GetStudents.pending, (state) => {
                    state.status_student = 'loading';
                })
                builder.addCase(GetStudents.fulfilled, (state, action) => {
                    state.status_student = 'succeeded';
                    state.students = action.payload;
                })
                builder.addCase(GetStudents.rejected, (state) => {
                    state.status_student = 'failed';
                })
    }
});

// Thunk to fetch courses for a student
export const TGetCourses = createAsyncThunk(
    'Teachers/GetCourses',
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


export const GetStudents=createAsyncThunk(
    'Getstudents',
    async () =>{
        let data=null;
        
        await axiosInstance.get('/api/studients')
        .catch(err=>{
            toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        .then((res) => {
            return data=res.data.students;
        })
        return data
    }
)





// Thunk to fetch student classes for a student
export const tgetClasses = createAsyncThunk(
    'Student/tStudentClasses',
    async (id) => {
        try {
            const response = await axiosInstance.get(`/api/teachers/getClasses/${id}`);
            return response.data.classes;
        } catch (error) {
            toast.error(`X ${error.response.data.message}`, StyleToast);
            throw error;
        }
    }
);

// add request to join in course


export default TeacherSlice;
