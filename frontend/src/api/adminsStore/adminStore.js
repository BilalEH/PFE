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



        builder.addCase(deleteParent.pending, (state) => {
            state.status = 'loading';
        });

        builder.addCase(deleteParent.fulfilled, (state, action) => {
            state.status = 'succeeded';
            // Remove the deleted parent from the state
            state.parents = state.parents.filter(parent => parent.id !== action.payload.parentId);
        });

        builder.addCase(deleteParent.rejected, (state) => {
            state.status = 'failed';
        });

        builder.addCase(updateParent.pending, (state) => {
            state.status = 'loading';
        });

        builder.addCase(updateParent.fulfilled, (state, action) => {
            state.status = 'succeeded';
            // Update the parent in the state
            const updatedParentIndex = state.parents.findIndex(parent => parent.id === action.payload.parentId);
            if (updatedParentIndex !== -1) {
                state.parents[updatedParentIndex] = action.payload.updatedParent;
            }
        });

        builder.addCase(updateParent.rejected, (state) => {
            state.status = 'failed';
        });

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
        // Add reducers for delete and update actions
        builder.addCase(deleteStudent.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(deleteStudent.fulfilled, (state, action) => {
            state.status = 'succeeded';
            // Remove the deleted student from the state
            state.students = state.students.filter(student => student.id !== action.payload.studentId);
        })
        builder.addCase(deleteStudent.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(updateStudent.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(updateStudent.fulfilled, (state, action) => {
            state.status = 'succeeded';
            // Update the student in the state
            const updatedStudentIndex = state.students.findIndex(student => student.id === action.payload.studentId);
            if (updatedStudentIndex !== -1) {
                state.students[updatedStudentIndex] = action.payload.updatedStudent;
            }
        })
        builder.addCase(updateStudent.rejected, (state) => {
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


export const deleteStudent = createAsyncThunk(
    'admin/deleteStudent',
    async (studentId) => {
        // Make an API call to delete the student
        await axiosInstance.delete(`/api/students/${studentId}`)
            .catch(err => {
                toast.error(`X ${err.response.data.message}`, StyleToast);
                throw err;
            });
        // Return the deleted studentId
        return { studentId };
    }
);

export const updateStudent = createAsyncThunk(
    'admin/updateStudent',
    async ({ studentId, updatedStudent }) => {
        // Make an API call to update the student
        await axiosInstance.put(`/api/students/${studentId}`, updatedStudent)
            .catch(err => {
                toast.error(`X ${err.response.data.message}`, StyleToast);
                throw err;
            });
        // Return the updated student data
        return { studentId, updatedStudent };
    }
);


export const deleteParent = createAsyncThunk(
    'admin/deleteParent',
    async (parentId) => {
        try {
            await axiosInstance.delete(`/api/parents/${parentId}`);
            return { parentId };
        } catch (error) {
            toast.error(`X ${error.response.data.message}`, StyleToast);
            throw error;
        }
    }
);

export const updateParent = createAsyncThunk(
    'admin/updateParent',
    async ({ parentId, updatedParent }) => {
        try {
            await axiosInstance.put(`/api/parents/${parentId}`, updatedParent);
            return { parentId, updatedParent };
        } catch (error) {
            toast.error(`X ${error.response.data.message}`, StyleToast);
            throw error;
        }
    }
);








export default AdminSlice.reducer;
// export const {}=StudentsSlice.actions;
