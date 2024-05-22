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
        teacher: [],
        students: [],
        studentClasses: [],  
        messages: [],
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

        // Reducer for getting students
        builder.addCase(GetStudents.pending, (state) => {
            state.status_student = 'loading';
        });
        builder.addCase(GetStudents.fulfilled, (state, action) => {
            state.status_student = 'succeeded';
            state.students = action.payload;
        });
        builder.addCase(GetStudents.rejected, (state) => {
            state.status_student = 'failed';
        });

        // Reducer for getting messages
        builder.addCase(GetMessages.pending, (state) => {
            state.status_message = 'loading';
        });
        builder.addCase(GetMessages.fulfilled, (state, action) => {
            state.status_message = 'succeeded';
            state.messages = action.payload;
        });
        builder.addCase(GetMessages.rejected, (state) => {
            state.status_message = 'failed';
        });

        // Reducer for adding a message
        builder.addCase(AddMessage.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(AddMessage.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            state.messages.push(action.payload);
        });
        builder.addCase(AddMessage.rejected, (state) => {
            state.action_status = 'failed';
        });

        // Reducer for deleting a message
        builder.addCase(DeleteMessage.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(DeleteMessage.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            state.messages = state.messages.filter(message => message.id !== action.payload);
        });
        builder.addCase(DeleteMessage.rejected, (state) => {
            state.action_status = 'failed';
        });

        // Reducer for updating a message
        builder.addCase(UpdateMessage.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(UpdateMessage.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            const updatedMessageIndex = state.messages.findIndex(message => message.id === action.payload.id);
            if (updatedMessageIndex !== -1) {
                state.messages[updatedMessageIndex] = action.payload;
            }
        });
        builder.addCase(UpdateMessage.rejected, (state) => {
            state.action_status = 'failed';
        });
    }
});

// Thunk to fetch courses for a student
export const TGetCourses = createAsyncThunk(
    'Teachers/GetCourses',
    async () => {
        let data = null;
        await axiosInstance.get('/api/courses')
            .catch(err => {
                toast.error(`X ${err.response.data.message}`, StyleToast);
            })
            .then((res) => {
                return data = res.data.courses;
            });
        return data;
    }
);

// Thunk to fetch students
export const GetStudents = createAsyncThunk(
    'Teachers/GetStudents',
    async () => {
        let data = null;
        await axiosInstance.get('/api/students')
            .catch(err => {
                toast.error(`X ${err.response.data.message}`, StyleToast);
            })
            .then((res) => {
                return data = res.data.students;
            });
        return data;
    }
);

// Thunk to fetch messages
export const GetMessages = createAsyncThunk(
    'Teachers/GetMessages',
    async () => {
        let data = null;
        await axiosInstance.get('/api/messages')
            .catch(err => {
                toast.error(`X ${err.response.data.message}`, StyleToast);
            })
            .then((res) => {
                return data = res.data.messages;
            });
        return data;
    }
);

// Thunk to add a message
export const AddMessage = createAsyncThunk(
    'Teachers/AddMessage',
    async (messageData) => {
        let data = null;
        await axiosInstance.post('/api/messages', messageData)
            .catch(err => {
                toast.error(`X ${err.response.data.message}`, StyleToast);
            })
            .then((res) => {
                return data = res.data.message;
            });
        return data;
    }
);

// Thunk to delete a message
export const DeleteMessage = createAsyncThunk(
    'Teachers/DeleteMessage',
    async (messageId) => {
        await axiosInstance.delete(`/api/messages/${messageId}`)
            .catch(err => {
                toast.error(`X ${err.response.data.message}`, StyleToast);
            });
        return messageId;
    }
);

// Thunk to update a message
export const UpdateMessage = createAsyncThunk(
    'Teachers/UpdateMessage',
    async ({ messageId, messageData }) => {
        let data = null;
        await axiosInstance.put(`/api/messages/${messageId}`, messageData)
            .catch(err => {
                toast.error(`X ${err.response.data.message}`, StyleToast);
            })
            .then((res) => {
                return data = res.data.message;
            });
        return data;
    }
);

export default TeacherSlice;
