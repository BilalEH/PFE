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
        requests:[],
        status_course_request:'',
        course_requests:[],
        status_message:'',
        messages:[],
        class_Students:[],
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
        // delete course
        builder.addCase(deleteCourse.pending, (state) => {
            state.action_status = 'loading';
        })
        builder.addCase(deleteCourse.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            state.courses = state.courses.filter(student => student.id !== action.payload);
        })
        builder.addCase(deleteCourse.rejected, (state) => {
            state.action_status = 'failed';
        })
        // --------------------------------------Update
        // update course
        builder.addCase(updateCourse.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(updateCourse.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            state.courses=state.courses.map(e=>e.id===action.payload.courseId?{...action.payload.updatedCourse,id:action.payload.courseId}:e);
        });
        builder.addCase(updateCourse.rejected, (state) => {
            state.action_status = 'failed';
        });
        // update parent
        builder.addCase(updateParent.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(updateParent.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            state.parents=state.parents.map(e=>e.id===action.payload.id?action.payload:e);
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
            state.students=state.students.map(e=>e.id===action.payload.id?action.payload:e);
        })
        builder.addCase(updateStudent.rejected, (state) => {
            state.action_status = 'failed';
        })
        //updating teacher
        builder.addCase(updateTeacher.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(updateTeacher.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            state.teachers=state.teachers.map(e=>e.id===action.payload.id?action.payload:e);
        });
        builder.addCase(updateTeacher.rejected, (state) => {
            state.action_status = 'failed';
        });
        // --------------------------------------Add
        // add course
        builder.addCase(addCourse.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(addCourse.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            state.courses=[...state.courses,action.payload];
        });
        builder.addCase(addCourse.rejected, (state) => {
            state.action_status = 'failed';
        });
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
        // get Courses Requests to join
        builder.addCase(ACoursesReqList.pending, (state) => {
            state.status_course_request = 'loading';
        })
        builder.addCase(ACoursesReqList.fulfilled, (state, action) => {
            state.status_course_request = 'succeeded';
            state.course_requests = action.payload;
        })
        builder.addCase(ACoursesReqList.rejected, (state) => {
            state.status_course_request = 'failed';
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
        // Accept Message
        builder.addCase(AdminAcceptMessage.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(AdminAcceptMessage.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            state.messages = state.messages.map(e => e.id === action.payload.id ? action.payload : e);
        });
        builder.addCase(AdminAcceptMessage.rejected, (state) => {
            state.action_status = 'failed';
        });
        // reject Message
        builder.addCase(AdminRejectMessage.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(AdminRejectMessage.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            state.messages = state.messages.map(e => e.id === action.payload.id ? action.payload : e);
        });
        builder.addCase(AdminRejectMessage.rejected, (state) => {
            state.action_status = 'failed';
        });
        // Get Class Students
        builder.addCase(GetClassStudents.pending, (state) => {
            state.action_status = 'loading';
        });
        builder.addCase(GetClassStudents.fulfilled, (state, action) => {
            state.action_status = 'succeeded';
            state.class_Students = action.payload;
        });
        builder.addCase(GetClassStudents.rejected, (state) => {
            state.action_status = 'failed';
        });
        // remove Students in class
        builder.addCase(RemoveStudentInClass.pending, (state) => {
        });
        builder.addCase(RemoveStudentInClass.fulfilled, (state, action) => {
            state.class_Students = state.class_Students.filter(e => e.id !== action.payload);
        });
        builder.addCase(RemoveStudentInClass.rejected, (state) => {
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
        const toastId = toast.loading('Loading...',StyleToast);
        await axiosInstance.get(`/api/admin/acceptuser/${Ele.id}`)
        .catch(err=>{
            toast.dismiss(toastId);
            toast.error(`X ${err.response.data.message}`, StyleToast);
        })
        .then((res) => {
            toast.dismiss(toastId);
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
    // accept message 
export const AdminAcceptMessage=createAsyncThunk(
    'AdminAcceptMessage',
    async ({MesID}) =>{
        const toastId = toast.loading('Loading...',StyleToast);
        let data=null;
        await axiosInstance.put(`/api/message/accept-msg/${MesID}`)
        .catch(err=>{
            toast.dismiss(toastId);
            toast.error(`X ${err.response.data.error}`, StyleToast);
        })
        .then((res) => {
            toast.dismiss(toastId);
            toast.success(`message accepted successfully`, StyleToast);
            data=res.data.message;
        })
        return data
    }
)
    // reject message 
export const AdminRejectMessage=createAsyncThunk(
    'AdminRejectMessage',
    async ({MesID}) =>{
        const toastId = toast.loading('Loading...',StyleToast);
        let data=null;
        await axiosInstance.put(`/api/message/reject-msg/${MesID}`)
        .catch(err=>{
            toast.dismiss(toastId);
            toast.error(`X ${err.response.data.error}`, StyleToast);
        })
        .then((res) => {
            toast.dismiss(toastId);
            toast.success(`message rejected successfully`, StyleToast);
            data=res.data.message;
        })
        return data
    }
)




export const addCourse = createAsyncThunk(
    'admin/addCourse',
    async (courseData) => {
        const toastId = toast.loading('Loading...',StyleToast);
        try {
            const response = await axiosInstance.post(`/api/courses`, courseData);
            toast.dismiss(toastId);
            toast.success(`course added successfully`, StyleToast);
            return response.data.course            ;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`X ${error.response.data.message}`, StyleToast);
            throw error;
        }
    }
);


export const deleteCourse = createAsyncThunk(
    'admin/deleteCourse',
    async (courseId) => {
        const toastId = toast.loading('Loading...',StyleToast);
        try {
            await axiosInstance.delete(`/api/courses/${courseId}`);
            toast.dismiss(toastId);
            toast.success(`course deleted successfully`, StyleToast);
            return courseId;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`X ${error.response.data.message}`, StyleToast);
            throw error;
        }
    }
);

export const updateCourse = createAsyncThunk(
    'admin/updateCourse',
    async ({ courseId, updatedCourse }) => {
        const toastId = toast.loading('Loading...',StyleToast);
        try {
            await axiosInstance.put(`/api/courses/${courseId}`, updatedCourse);
            toast.dismiss(toastId);
            toast.success(`course updated successfully`, StyleToast);
            return {updatedCourse,courseId};
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`X ${error.response.data.message}`, StyleToast);
            throw error;
        }
    }
);







export const deleteStudent = createAsyncThunk(
    'admin/deleteStudent',
    async (studentId) => {
        const toastId = toast.loading('Loading...',StyleToast);
        await axiosInstance.delete(`/api/studients/${studentId}`)
        .catch(err => {
            toast.dismiss(toastId);
            toast.error(`X ${err.response.data.message}`, StyleToast);
            throw err;
        }).then(() => {
                toast.dismiss(toastId);
                toast.success(`X ${"Student deleted successfully"}`, StyleToast);
            });
        return { studentId };
    }
);

export const updateStudent = createAsyncThunk(
    'admin/updateStudent',
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


export const deleteParent = createAsyncThunk(
    'admin/deleteParent',
    async (parentId) => {
        const toastId = toast.loading('Loading...',StyleToast);
        try {
        await axiosInstance.delete(`/api/parents/${parentId}`);
        toast.dismiss(toastId);
        return { parentId };
    } catch (error) {
            toast.dismiss(toastId);
            toast.error(`X ${error.response.data.message}`, StyleToast);
            throw error;
        }
    }
);

export const updateParent = createAsyncThunk(
    'admin/updateParent',
    async ({ parentId, updatedParent }) => {
        const toastId = toast.loading('Loading...',StyleToast);
        try {
            const { data } = await axiosInstance.put(`/api/parents/${parentId}`, updatedParent);
            toast.dismiss(toastId);
            toast.success(`X ${"Parent updated successfully"}`, StyleToast);
            return data.parent;
        } catch (error) {
            toast.dismiss(toastId);
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

// update teacher
export const updateTeacher = createAsyncThunk(
    'admin/updateTeacher',
    async ({ teacherId, updatedTeacher }) => {
        const toastId = toast.loading('Loading...',StyleToast);
        try {
            const data =await axiosInstance.put(`/api/teachers/${teacherId}`, updatedTeacher);
            toast.dismiss(toastId);
            return data.data.teacher;
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
        const toastId = toast.loading('Loading...',StyleToast);
        try {
        const response = await axiosInstance.post(`/api/classes`, classData);
        toast.dismiss(toastId);
        return response.data;
    } catch (error) {
        toast.dismiss(toastId);
        toast.error(`X ${error.response.data.message}`, StyleToast);
        throw error;
    }
    }
);

export const ACoursesReqList = createAsyncThunk(
    "admin/ACoursesReqList",
    async () => {
        try {
        const response = await axiosInstance.get(`/api/course/requests-list`);
        return response.data;
    } catch (error) {
        toast.error(`X ${error.response.data.message}`, StyleToast);
        throw error;
    }
    }
);

export const GetClassStudents = createAsyncThunk(
    "admin/GetClassStudents",
    async ({ClassId}) => {
        try {
        const response = await axiosInstance.get(`/api/classe/get-students/${ClassId}`);
        return response.data.students;
    } catch (error) {
        toast.error(`X ${error.response.data.message}`, StyleToast);
        throw error;
    }
    }
);

export const RemoveStudentInClass = createAsyncThunk(
    "admin/RemoveStudentInClass",
    async ({ClassId,studentId}) => {
        let data=null
        const toastId = toast.loading('Loading...',StyleToast);
        try {
            await axiosInstance.post(`/api/classes/removestudent/${ClassId}`,studentId);
            toast.dismiss(toastId);
            toast.success(`X ${"Student removed successfully"}`, StyleToast);
            return studentId.student_id;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`X ${error.response.data.message}`, StyleToast);
        throw error;
    }
}
);




export default AdminSlice.reducer;
// export const {}=StudentsSlice.actions;
