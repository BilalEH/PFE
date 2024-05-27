import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { axiosInstance } from './../axios';
import { toast } from 'react-toastify';
import { StyleToast } from './../../layouts/Layout';

export const ParentsSlice=createSlice({
    name:'ParentsSlice',
    initialState:{
        action_status:'',
        parent:{},
        parent_status:'',
        students:[],
        student_status:'',
        courses:[],
        course_status:'',
        studentClasses:[],
        stu_class_status:'',
        payments:[],
        payment_status:'',
        messages:[],
        message_status:'',
    },
    extraReducers:(builder)=>{
        // get payments
        builder.addCase(PGetPaymentList.pending, (state) => {
            state.payment_status = 'loading';
        });
        builder.addCase(PGetPaymentList.fulfilled, (state, action) => {
            state.payment_status = 'succeeded';
            state.payments = action.payload;
        });
        builder.addCase(PGetPaymentList.rejected, (state) => {
            state.payment_status = 'failed';
        });
        // get courses
        builder.addCase(PGetCourses.pending, (state) => {
            state.course_status = 'loading';
        });
        builder.addCase(PGetCourses.fulfilled, (state, action) => {
            state.course_status = 'succeeded';
            state.courses = action.payload;
        });
        builder.addCase(PGetCourses.rejected, (state) => {
            state.course_status = 'failed';
        });
        // parent children's list
        builder.addCase(ParentStudentsList.pending, (state) => {
            state.student_status = 'loading';
        });
        builder.addCase(ParentStudentsList.fulfilled, (state, action) => {
            state.student_status = 'succeeded';
            state.students = action.payload;
        });
        builder.addCase(ParentStudentsList.rejected, (state) => {
            state.student_status = 'failed';
        });
        // student classes list
        builder.addCase(PStudentClasses.pending, (state) => {
            state.stu_class_status = 'loading';
        });
        builder.addCase(PStudentClasses.fulfilled, (state, action) => {
            state.stu_class_status = 'succeeded';
            state.studentClasses = action.payload;
        });
        builder.addCase(PStudentClasses.rejected, (state) => {
            state.stu_class_status = 'failed';
        });
        // show parent messages
        builder.addCase(PgetUserMessages.pending, (state) => {
            state.message_status = 'loading';
        });
        builder.addCase(PgetUserMessages.fulfilled, (state, action) => {
            state.message_status = 'succeeded';
            state.messages = action.payload;
        });
        builder.addCase(PgetUserMessages.rejected, (state) => {
            state.message_status = 'failed';
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
            state.messages = state.messages.filter(e=>e.id!==action.payload);
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
        // parent add student 
        builder.addCase(PAddStudent.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(PAddStudent.fulfilled, (state,action) => {
            state.students=[...state.students,action.payload];
            state.action_status = 'succeeded';
        });
        builder.addCase(PAddStudent.rejected, (state) => {
            state.action_status = 'succeeded';
        });
        // delete student 
        builder.addCase(PDeleteStudent.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(PDeleteStudent.fulfilled, (state,action) => {
            state.students=state.students.filter(e=>e.id!==action.payload);
            state.action_status = 'succeeded';
        });
        builder.addCase(PDeleteStudent.rejected, (state) => {
            state.action_status = 'succeeded';
        });
        // update student 
        builder.addCase(PupdateStudent.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(PupdateStudent.fulfilled, (state,action) => {
            state.students=state.students.map(e=>e.id===action.payload.id?action.payload:e);
            state.action_status = 'succeeded';
        });
        builder.addCase(PupdateStudent.rejected, (state) => {
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
        const toastId = toast.loading('Loading...',StyleToast);
        await axiosInstance.post(`api/messages`,Ele)
        .catch(err=>{
            toast.dismiss(toastId);
            toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        .then((res) => {
            toast.dismiss(toastId);
            toast.success(`Message sent successfully`, StyleToast);
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
        await axiosInstance.get(`/api/messages/usermessages/${id}`)
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
        const toastId = toast.loading('Loading...',StyleToast);
        await axiosInstance.delete(`/api/messages/${id}`)
        .catch(err=>{
            toast.dismiss(toastId);
            toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        .then(() => {
            toast.dismiss(toastId);
            toast.success(`Message deleted successfully`, StyleToast);
            return data=id;
        })
        return data;
    }
)
// add request to join in course
export const addRequest=createAsyncThunk(
    'Parent/addRequest',
    async (Ele) =>{
        const toastId = toast.loading('Loading...',StyleToast);
        await axiosInstance.post(`/api/courses/add-request/${Ele.id}`,Ele.data)
        .catch(err=>{
            toast.dismiss(toastId);
            toast.error(`X ${err.response.data.message}`, StyleToast);
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
// export const RemoveRequest=createAsyncThunk(
//     'Parent/RemoveRequest',
//     async (Ele) =>{
//         let data=null;
//         await axiosInstance.post(`/api/messages/${Ele.id}`)
//         .catch(err=>{
//             toast.error(`X ${err.response.data.message}`, StyleToast);
//         })
//         .then(() => {
//             return data=id;
//         })
//         return data;
//     }
// )

    // parent add child
export const PAddStudent=createAsyncThunk(
    'Parent/addStudent',
    async (Ele) =>{
        let data=null;
        const toastId = toast.loading('Loading...',StyleToast);
        await axiosInstance.post(`/api/parent/add-childrens/${Ele.id}`,Ele.data)
        .catch(err=>{
            toast.dismiss(toastId);
            return toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        .then((res) => {
            toast.dismiss(toastId);
            if(res.data.student){
                toast.success(`student added successfully`, StyleToast);
            }
            return data=res.data.student;
        })
        return data;
    }
)

// get payment List
export const PGetPaymentList=createAsyncThunk(
    'Parent/PGetPaymentList',
    async (parent_id) =>{
        let data=null;
        await axiosInstance.get(`/api/parent/childrens-payments/${parent_id}`)
        .then((res) => {
            return data=res.data.childrens;
        })
        .catch(err=>{
            return toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        return data;
    }
)


// delete student
export const PDeleteStudent=createAsyncThunk(
    'Parent/PDeleteStudent',
    async (stu_id) =>{
        let data=null;
        const toastId = toast.loading('Loading...',StyleToast);
        await axiosInstance.delete(`/api/studients/${stu_id}`)
        .catch(err=>{
            toast.dismiss(toastId);
            return toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        .then((res) => {
            toast.dismiss(toastId);
            toast.success(`student deleted successfully`, StyleToast);
            return data=stu_id;
        })
        return data;
    }
)

export const PupdateStudent = createAsyncThunk(
    'admin/PupdateStudent',
    async ({ studentId, updatedStudent }) => {
        let data=null;
        const toastId = toast.loading('Loading...',StyleToast);
        await axiosInstance.put(`/api/studients/${studentId}`, updatedStudent)
        .catch(err => {
            toast.dismiss(toastId);
            toast.error(`X ${err.response.data.message}`, StyleToast);
        }).then((res) => {
            toast.dismiss(toastId);
            toast.success(`X ${"Student updated successfully"}`, StyleToast);
            return data= res.data.student;
        });
        return data
    }
);






export default ParentsSlice.reducer;
// export const {}=ParentsSlice.actions;
