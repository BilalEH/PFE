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
        messages:[],
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
        // show parent messages
        builder.addCase(PgetUserMessages.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(PgetUserMessages.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.messages = action.payload;
        });
        builder.addCase(PgetUserMessages.rejected, (state) => {
            state.status = 'failed';
        });
        // add message to admin
        builder.addCase(PAddMessages.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(PAddMessages.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            state.messages = [...state.messages,action.payload];
        });
        builder.addCase(PAddMessages.rejected, (state) => {
            state.action_status = 'failed';
        });
        // delete message 
        builder.addCase(PDeleteMessage.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(PDeleteMessage.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            state.messages = state.messages.filter(e=>e.user_id.id!==action.payload);
        });
        builder.addCase(PDeleteMessage.rejected, (state) => {
            state.action_status = 'failed';
        });
        // remove student in class
        builder.addCase(PRemoveStudentInClasses.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(PRemoveStudentInClasses.fulfilled, (state,action) => {
            state.studentClasses=state.studentClasses.filter(e=>e.pivot.classe_id!==action.payload);
            state.action_status = 'succeeded';
        });
        builder.addCase(PRemoveStudentInClasses.rejected, (state) => {
            state.action_status = 'succeeded';
        });
    }
})


    // get courses
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
    // get parent children list
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

    // get student classes
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
    // remove student in class
export const PRemoveStudentInClasses=createAsyncThunk(
    'Parent/PRemoveStudentInClasses',
    async (Ele) =>{
        let data=null;
        await axiosInstance.post(`/api/classes/removestudent/${Ele.id}`,Ele.data)
        .catch(err=>{
            toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        .then((res) => {
            toast.success(`${res.data.message}`, StyleToast);
            return data=Ele.id;
        })
        return data;
    }
)

    // add message to admins
export const PAddMessages=createAsyncThunk(
    'Parent/PAddMessages',
    async (Ele) =>{
        let data=null;
        await axiosInstance.post(`/api/studients/getClasses`,Ele)
        .catch(err=>{
            toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        .then((res) => {
            return data=res.data.message;
        })
        return data;
    }
)
// get user messages
export const PgetUserMessages=createAsyncThunk(
    'Parent/PgetUserMessages',

    async (id) =>{
        let data=null;
        await axiosInstance.post(`/api/messages/usermessages/${id}`)
        .catch(err=>{
            toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        .then((res) => {
            return data=res.data.messages;
        })
        return data;
    }
)
// delete message 
export const PDeleteMessage=createAsyncThunk(
    'Parent/PDeleteMessage',
    async (id) =>{
        let data=null;
        await axiosInstance.delete(`/api/messages/${id}`)
        .catch(err=>{
            toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        .then((res) => {
            return data=id;
        })
        return data;
    }
)









export default ParentsSlice.reducer;
// export const {}=ParentsSlice.actions;
