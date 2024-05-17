import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { axiosInstance } from './../axios';
import { toast } from 'react-toastify';
import { StyleToast } from './../../layouts/Layout';

export const ParentsSlice=createSlice({
    name:'studentsSlice',
    initialState:{
        status:'',
        parent:{},
        students:[],
        courses:[],
        studentClasses:[],
        action_status:''
    },
    extraReducers:(builder)=>{
        // get courses
        builder.addCase(PGetCourses.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(PGetCourses.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.courses = action.payload;
        });
        builder.addCase(PGetCourses.rejected, (state) => {
            state.status = 'failed';
        });
        // parent children's list
        builder.addCase(ParentStudentsList.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(ParentStudentsList.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.students = action.payload;
        });
        builder.addCase(ParentStudentsList.rejected, (state) => {
            state.status = 'failed';
        });
        // student classes list
        builder.addCase(PStudentClasses.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(PStudentClasses.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            state.studentClasses = action.payload;
        });
        builder.addCase(PStudentClasses.rejected, (state) => {
            state.action_status = 'failed';
        });
    }
})

export const PGetCourses=createAsyncThunk(
    'Parent/GetCourses',
    async () =>{
        let data=null;
        await axiosInstance.get('/api/courses')
        .catch(err=>{
            toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        .then((res) => {
            return data=res.data.courses;
        })
        return data;
    }
)
export const ParentStudentsList=createAsyncThunk(
    'Parent/ParentStudentsList',

    async (id) =>{
        let data=null;
        await axiosInstance.get(`/api/parent/childrens/${id}`)
        .catch(err=>{
            toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        .then((res) => {
            return data=res.data.childrens;
        })
        return data;
    }
)


export const PStudentClasses=createAsyncThunk(
    'Parent/PStudentClasses',

    async (id) =>{
        let data=null;
        await axiosInstance.get(`/api/studients/getClasses/${id}`)
        .catch(err=>{
            toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        .then((res) => {
            return data=res.data.classes;
        })
        return data;
    }
)









export default ParentsSlice.reducer;
// export const {}=ParentsSlice.actions;
