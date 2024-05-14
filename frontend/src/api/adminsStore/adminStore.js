import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { axiosInstance } from './../axios';
import { toast } from 'react-toastify';
import { StyleToast } from './../../layouts/Layout';

export const AdminSlice=createSlice({
    name:'studentsSlice',
    initialState:{
        status:'',
        admins:[],
        students:[],
        parents:[],
        teachers:[],
        courses:[],
        action_status:''
    },
    extraReducers:(builder)=>{
        // getStudents
        builder.addCase(GetStudents.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(GetStudents.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.students = action.payload;
        })
        builder.addCase(GetStudents.rejected, (state) => {
            state.status = 'failed';
        })
        // getParents
        builder.addCase(GetParents.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(GetParents.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.parents = action.payload;
        })
        builder.addCase(GetParents.rejected, (state) => {
            state.status = 'failed';
        })
        // getAdmins
        builder.addCase(GetAdmins.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(GetAdmins.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.parents = action.payload;
        })
        builder.addCase(GetAdmins.rejected, (state) => {
            state.status = 'failed';
        })
        // getTeachers
        builder.addCase(GetTeachers.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(GetTeachers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.teachers = action.payload;
        })
        builder.addCase(GetTeachers.rejected, (state) => {
            state.status = 'failed';
        })
        // getCourses
        builder.addCase(GetCourses.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(GetCourses.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.courses = action.payload;
        })
        builder.addCase(GetCourses.rejected, (state) => {
            state.status = 'failed';
        })

    }
})

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
export const GetParents=createAsyncThunk(
    'GetParents',
    async () =>{
        let data=null;
        await axiosInstance.get('/api/parents')
        .catch(err=>{
            toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        .then((res) => {
            return data=res.data.parents;
        })
        return data
    }
)
export const GetAdmins=createAsyncThunk(
    'GetAdmins',
    async () =>{
        let data=null;
        await axiosInstance.get('/api/admins')
        .catch(err=>{
            toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        .then((res) => {
            return data=res.data.admins;
        })
        return data
    }
)
export const GetTeachers=createAsyncThunk(
    'GetTeachers',
    async () =>{
        let data=null;
        await axiosInstance.get('/api/teachers')
        .catch(err=>{
            toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        .then((res) => {
            return data=res.data.teachers;
        })
        return data
    }
)

export const GetCourses=createAsyncThunk(
    'GetCourses',
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
)












export default AdminSlice.reducer;
// export const {}=StudentsSlice.actions; 