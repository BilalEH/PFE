import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { axiosInstance } from './../axios';
import { toast } from 'react-toastify';
import { StyleToast } from './../../layouts/Layout';

export const AdminSlice=createSlice({
    name:'studentsSlice',
    initialState:{
        action_status:'',
        status_admin:'',
        admins:[],
        status_student:'',
        students:[],
        status_parent:'',
        parents:[],
        status_teacher:'',
        teachers:[],
        status_course:'',
        courses:[],
        status_classe:'',
        classes: [],
        status_request:'',
        requests:{},
        status_message:'',
        messages:{},
    },
    extraReducers:(builder)=>{
        // --------------------------------------Delete--------------------------------------
        // delete parent
        builder.addCase(deleteParent.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(deleteParent.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            state.parents = state.parents.filter(parent => parent.id !== action.payload.parentId);
        });
        builder.addCase(deleteParent.rejected, (state) => {
            state.action_status = 'failed';
        });
        //delete teacher
        builder.addCase(deleteTeacher.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(deleteTeacher.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            state.teachers = state.teachers.filter(teacher => teacher.id !== action.payload.teacherId);
        });
        builder.addCase(deleteTeacher.rejected, (state) => {
            state.action_status = 'failed';
        });
        // delete student
        builder.addCase(deleteStudent.pending, (state) => {
            state.action_status = 'loading';
        })
        builder.addCase(deleteStudent.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            state.students = state.students.filter(student => student.id !== action.payload.studentId);
        })
        builder.addCase(deleteStudent.rejected, (state) => {
            state.action_status = 'failed';
        })
        // --------------------------------------Update
        // update parent
        builder.addCase(updateParent.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(updateParent.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            const updatedParentIndex = state.parents.findIndex(parent => parent.id === action.payload.parentId);
            if (updatedParentIndex !== -1) {
                state.parents[updatedParentIndex] = action.payload.updatedParent;
            }
        });
        builder.addCase(updateParent.rejected, (state) => {
            state.action_status = 'failed';
        });
        // update student
        builder.addCase(updateStudent.pending, (state) => {
            state.action_status = 'loading';
        })
        builder.addCase(updateStudent.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            const updatedStudentIndex = state.students.findIndex(student => student.id === action.payload.studentId);
            if (updatedStudentIndex !== -1) {
                state.students[updatedStudentIndex] = action.payload.updatedStudent;
            }
        })
        builder.addCase(updateStudent.rejected, (state) => {
            state.action_status = 'failed';
        })
        // --------------------------------------Add
        // add teacher
        builder.addCase(addTeacher.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(addTeacher.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            const newTeacher = action.payload;
            // Add the new teacher to the state
            state.teachers.push(newTeacher);
        });
        builder.addCase(addTeacher.rejected, (state) => {
            state.action_status = 'failed';
        });
        // Add cases for updating teacher
        builder.addCase(updateTeacher.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(updateTeacher.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            const updatedTeacherIndex = state.teachers.findIndex(teacher => teacher.id === action.payload.teacherId);
            if (updatedTeacherIndex !== -1) {
                state.teachers[updatedTeacherIndex] = action.payload.updatedTeacher;
            }
        });
        builder.addCase(updateTeacher.rejected, (state) => {
            state.action_status = 'failed';
        });
        // Add classes
        builder.addCase(addClass.pending, (state) => {
            state.action_status = "loading";
        });
        builder.addCase(addClass.fulfilled, (state, action) => {
            state.action_status = "succeeded";
            state.classes=action.payload;
        });
        builder.addCase(addClass.rejected, (state) => {
            state.action_status = "failed";
        });
        // --------------------------------------Get
        // get Classes
        builder.addCase(AdminGetClasses.pending, (state) => {
            state.status_classe = 'loading';
        })
        builder.addCase(AdminGetClasses.fulfilled, (state, action) => {
            state.status_classe = 'succeeded';
            state.classes = action.payload;
        })
        builder.addCase(AdminGetClasses.rejected, (state) => {
            state.status_classe = 'failed';
        })
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
        // getParents
        builder.addCase(GetParents.pending, (state) => {
            state.status_parent = 'loading';
        })
        builder.addCase(GetParents.fulfilled, (state, action) => {
            state.status_parent = 'succeeded';
            state.parents = action.payload;
        })
        builder.addCase(GetParents.rejected, (state) => {
            state.status_parent = 'failed';
        })
        // getAdmins
        builder.addCase(GetAdmins.pending, (state) => {
            state.status_admin = 'loading';
        })
        builder.addCase(GetAdmins.fulfilled, (state, action) => {
            state.status_admin = 'succeeded';
            state.admins = action.payload;
        })
        builder.addCase(GetAdmins.rejected, (state) => {
            state.status_admin = 'failed';
        })
        // getTeachers
        builder.addCase(GetTeachers.pending, (state) => {
            state.status_teacher = 'loading';
        })
        builder.addCase(GetTeachers.fulfilled, (state, action) => {
            state.status_teacher = 'succeeded';
            state.teachers = action.payload;
        })
        builder.addCase(GetTeachers.rejected, (state) => {
            state.status_teacher = 'failed';
        })
        // getCourses
        builder.addCase(GetCourses.pending, (state) => {
            state.status_course = 'loading';
        })
        builder.addCase(GetCourses.fulfilled, (state, action) => {
            state.status_course = 'succeeded';
            state.courses = action.payload;
        })
        builder.addCase(GetCourses.rejected, (state) => {
            state.status_course = 'failed';
        })

        // Get Requests list
        builder.addCase(GetRequests.pending, (state) => {
            state.status_request = 'loading';
        });
        builder.addCase(GetRequests.fulfilled, (state, action) => {
            state.status_request = 'succeeded';
            state.requests = action.payload;
        });
        builder.addCase(GetRequests.rejected, (state) => {
            state.status_request = 'failed';
        });
        // Get Messages list
        builder.addCase(GetUserMessages.pending, (state) => {
            state.status_message = 'loading';
        });
        builder.addCase(GetUserMessages.fulfilled, (state, action) => {
            state.status_message = 'succeeded';
            state.messages = action.payload;
        });
        builder.addCase(GetUserMessages.rejected, (state) => {
            state.status_message = 'failed';
        });

        // --------------------------------------...
        // Accept Users
        builder.addCase(AccepteUsers.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(AccepteUsers.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            if(action.payload.role==='student'){
                state.requests.students = state.requests.students.filter(e => e.user_id.id !== action.payload.id);
            }else{
                state.requests.parents = state.requests.parents.filter(e => e.user_id.id !== action.payload.id);
            }
        });
        builder.addCase(AccepteUsers.rejected, (state) => {
            state.action_status = 'failed';
        });

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
    'Admins/GetTeachers',
    async () =>{
        let data = null;
        try {
            const response = await axiosInstance.get('/api/teachers');
            data = response.data.teachers;
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            if (errorMessage) {
                toast.error(`X ${errorMessage}`, StyleToast);
            } else {
                toast.error(`X Something went wrong`, StyleToast);
            }
        }
        return data;
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

// requests list is
export const GetRequests=createAsyncThunk(
    'GetRequests',
    async () =>{
        let data=null;
        await axiosInstance.get('/api/admin/requests')
        .catch(err=>{
            toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        .then((res) => {
            return data=res.data;
        })
        return data
    }
)



// Accept Users not verified
export const AccepteUsers=createAsyncThunk(
    'AccepteUsers',
    async (Ele) =>{
        let data=null;
        await axiosInstance.get(`/api/admin/acceptuser/${Ele.id}`)
        .catch(err=>{
            toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        .then((res) => {
            toast.success(`X ${res.data.message}`, StyleToast);
            data=Ele
        })
        return data
    }
)
    // show message list
export const GetUserMessages=createAsyncThunk(
    'GetUserMessages',
    async () =>{
        let data=null;
        await axiosInstance.get(`/api/messages`)
        .catch(err=>{
            toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        .then((res) => {
            data=res.data.messages
        })
        return data
    }



)



export const addCourse = createAsyncThunk(
    'admin/addCourse',
    async (courseData) => {
        try {
            const response = await axiosInstance.post(`/api/courses`, courseData);
            return response.data;
        } catch (error) {
            toast.error(`X ${error.response.data.message}`, StyleToast);
            throw error;
        }
    }
);


export const deleteCourse = createAsyncThunk(
    'admin/deleteCourse',
    async (courseId) => {
        try {
            await axiosInstance.delete(`/api/courses/${courseId}`);
            return courseId;
        } catch (error) {
            toast.error(`X ${error.response.data.message}`, StyleToast);
            throw error;
        }
    }
);

export const updateCourse = createAsyncThunk(
    'admin/updateCourse',
    async ({ courseId, updatedCourse }) => {
        try {
            const response = await axiosInstance.put(`/api/courses/${courseId}`, updatedCourse);
            return response.data;
        } catch (error) {
            toast.error(`X ${error.response.data.message}`, StyleToast);
            throw error;
        }
    }
);







export const deleteStudent = createAsyncThunk(
    'admin/deleteStudent',
    async (studentId) => {
        await axiosInstance.delete(`/api/studients/${studentId}`)
            .catch(err => {
                toast.error(`X ${err.response.data.message}`, StyleToast);
                throw err;
            }).then(() => {
                toast.success(`X ${"Student deleted successfully"}`, StyleToast);
            });
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



export const deleteTeacher = createAsyncThunk(
    'admin/deleteTeacher',
    async (teacherId) => {
        const toastId = toast.loading('Loading...',StyleToast);
        try {
            await axiosInstance.delete(`/api/teachers/${teacherId}`);
            toast.dismiss(toastId);
            return { teacherId };
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`X ${error.response.data.message}`, StyleToast);
            throw error;
        }
    }
);

// Create async thunk to update teacher
export const updateTeacher = createAsyncThunk(
    'admin/updateTeacher',
    async ({ teacherId, updatedTeacher }) => {
        const toastId = toast.loading('Loading...',StyleToast);
        try {
            await axiosInstance.put(`/api/teachers/${teacherId}`, updatedTeacher);
            toast.dismiss(toastId);
            return { teacherId, updatedTeacher };
        } catch (error) {
            toast.error(`X ${error.response.data.message}`, StyleToast);
            toast.dismiss(toastId);
            throw error;
        }
    }
);


export const addTeacher = createAsyncThunk(
    'teachers/addTeacher',
    async (teacherData) => {
        const toastId = toast.loading('Loading...',StyleToast);
        try {
            const response = await axiosInstance.post(`/api/teachers`, teacherData);
            toast.dismiss(toastId);
            return response.data.teacher;
        } catch (error) {
            toast.error(`X ${error.response.data.message}`, StyleToast);
            toast.dismiss(toastId);
            throw error;
        }
    }
);

export const AdminGetClasses = createAsyncThunk(
    "admin/AdminGetClasses",
    async () => {
    try {
        const response = await axiosInstance.get(`/api/classes`);
        return response.data.classes;
    } catch (error) {
        toast.error(`X ${error.response.data.message}`, StyleToast);
        throw error;
    }
});

    export const addClass = createAsyncThunk(
    "admin/addClass",
    async (classData) => {
    try {
        const response = await axiosInstance.post(`/api/classes`, classData);
        return response.data;
    } catch (error) {
        toast.error(`X ${error.response.data.message}`, StyleToast);
        throw error;
    }
    }
);



export default AdminSlice.reducer;
// export const {}=StudentsSlice.actions;
