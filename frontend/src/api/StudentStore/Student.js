import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from '../axios';
import { toast } from 'react-toastify';
import { StyleToast } from '../../layouts/Layout';

export const StudentsSlice = createSlice({
    name: 'studentsSlice',
    initialState: {
        action_status: '',
        student_status: '',  
        student: {},
        parent_status: '',  
        parents: [], 
        courses_status: '',
        courses: [], 
        message_status: '',  
        messages :[],
        classes_status: '',
        studentClasses: [],  
        payments :[],
        payments_status: '',
    },
    extraReducers: (builder) => {
        // student payment List
        builder.addCase(StuPayList.pending, (state) => {
            state.payments_status = 'loading';
        });
        builder.addCase(StuPayList.fulfilled, (state, action) => {
            state.payments_status = 'succeeded';
            state.payments = action.payload;
        });
        builder.addCase(StuPayList.rejected, (state) => {
            state.payments_status = 'failed';
        });
        // Reducer for getting courses
        builder.addCase(SGetCourses.pending, (state) => {
            state.courses_status = 'loading';
        });
        builder.addCase(SGetCourses.fulfilled, (state, action) => {
            state.courses_status = 'succeeded';
            state.courses = action.payload;
        });
        builder.addCase(SGetCourses.rejected, (state) => {
            state.courses_status = 'failed';
        });

        // Reducer for getting student classes list
        builder.addCase(SStudentClasses.pending, (state) => {
            state.Classes_status = 'loading';
        });
        builder.addCase(SStudentClasses.fulfilled, (state, action) => {
            state.Classes_status = 'succeeded';
            state.studentClasses = action.payload;
        });
        builder.addCase(SStudentClasses.rejected, (state) => {
            state.Classes_status = 'failed';
        });

            // Reducer for getting student messages
            builder.addCase(SGetMessages.pending, (state) => {
                state.status = 'loading';
            });
            builder.addCase(SGetMessages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.messages = action.payload;
            });
            builder.addCase(SGetMessages.rejected, (state) => {
                state.status = 'failed';
            });
    
            // Reducer for adding message
            builder.addCase(SAddMessage.pending, (state) => {
                state.action_status = 'loading';
            });
            builder.addCase(SAddMessage.fulfilled, (state, action) => {
                state.action_status = 'succeeded';
                state.messages = [...state.messages, action.payload];
            });
            builder.addCase(SAddMessage.rejected, (state) => {
                state.action_status = 'failed';
            });

            // remove student from class
            builder.addCase(StuRemoveSInClass.pending, (state) => {
                state.action_status = 'loading';
            });
            builder.addCase(StuRemoveSInClass.fulfilled, (state, action) => {
                state.action_status = 'succeeded';
            });
            builder.addCase(StuRemoveSInClass.rejected, (state) => {
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

// Thunk to fetch student classes for a student
export const SStudentClasses = createAsyncThunk(
    'Student/SStudentClasses',
    async (id) => {
        try {
            const response = await axiosInstance.get(`/api/studients/getClasses/${id}`);
            return response.data.classes;
        } catch (error) {
            toast.error(`X ${error.response.data.message}`, StyleToast);
            throw error;
        }
    }
);

// add request to join in course
export const SAddRequest=createAsyncThunk(
    'Student/addRequest',
    async (Ele) =>{
        const toastId = toast.loading('Loading...',StyleToast);
        await axiosInstance.post(`/api/courses/add-request/${Ele.id}`,Ele.data)
        .catch(err=>{
            toast.dismiss(toastId);
            toast.error(`X ${err.response.data.message}`, StyleToast);
            return 
        })
        .then((res) => {
            toast.dismiss(toastId);
            if(res.data.message!=='Request already sent'){
                toast.success(`Application under review`, StyleToast);
            }
            return
        })
    }
)



export const SGetMessages = createAsyncThunk(
    'Student/SGetMessages',
    async (id) => {
        try {
            const response = await axiosInstance.get(`/api/messages/usermessages/${id}`);
            return response.data.messages;
        } catch (error) {
            toast.error(`X ${error.response.data.message}`, StyleToast);
            throw error;
        }
    }
);

// Thunk to add message
export const SAddMessage = createAsyncThunk(
    'Student/SAddMessage',
    async (messageData) => {
        const toastId = toast.loading('Loading...', StyleToast);
        try {
            const response = await axiosInstance.post(`/api/messages`, messageData);
            toast.dismiss(toastId);
            toast.success(`Message sent successfully`, StyleToast);
            return response.data.message;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`X ${error.response.data.message}`, StyleToast);
            throw error;
        }
    }
);

// remove student from class
export const StuRemoveSInClass = createAsyncThunk(
    'Student/StuRemoveSInClass',
    async ({stuId,classID}) => {
        const toastId = toast.loading('Loading...', StyleToast);
        try {
            const response = await axiosInstance.post(`/api/classes/removestudent/${classID}`,{'student_id':stuId});
            toast.dismiss(toastId);
            toast.success(`removed successfully`, StyleToast);
            return response.data.message;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`X ${error.response.data.message}`, StyleToast);
            throw error;
        }
    }
);

// get payments list of students
export const StuPayList = createAsyncThunk(
    'Student/StuPayList',
    async (userId) => {
        try {
            const response = await axiosInstance.get(`/api/payments/stu-pays/${userId}`);
            return response.data.payments;
        } catch (error) {
            toast.error(`X ${error.response.data.message}`, StyleToast);
            throw error;
        }
    }
);

export default StudentsSlice;
