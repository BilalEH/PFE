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









export default ParentsSlice.reducer;
// export const {}=ParentsSlice.actions;
