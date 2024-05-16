import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Users from "../pages/Users";
import NotFound from "../pages/NotFound";
import Layout from "../layouts/Layout";
import ContactUs from "../pages/ContactUs";
import StudentHome from "../pages/student/StudentHome";
import ParentHome from "../pages/parent/ParentHome";
import AdminHome from "../pages/admin/AdminHome";
import AdminLayout from "../layouts/AdminLayout";
import StudentLayout from "../layouts/StudentLayout";
import ParentLayout from "../layouts/ParentLayout";
import AdminRequests from "../pages/admin/AdminRequests";
import AdminStudents from "../pages/admin/AdminStudents";
import AdminTeachers from "../pages/admin/AdminTeachers";
import AdminParents from "../pages/admin/AdminParents";
import AdminCourses from "../pages/admin/AdminCourses";
import AdminMessages from "../pages/admin/AdminMessages";
import AdminProfile from "../pages/admin/AdminProfile";
import ParentProfile from "../pages/parent/ParentProfile";
import StudentProfile from "../pages/student/StudentProfile";
import TeacherProfile from "../pages/Teacher/TeacherProfile";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/Contact",
                element: <ContactUs />,
            },
        ],
    },
    {
        element: <AdminLayout />,
        children: [
            {
                path: "/admin",
                element: <AdminHome />,
            },
            {
                path: "/admin/requests",
                element: <AdminRequests />,
            },
            {
                path: "/admin/students",
                element: <AdminStudents />,
            },
            {
                path: "/admin/parents",
                element: <AdminParents />,
            },
            {
                path: "/admin/teachers",
                element: <AdminTeachers />,
            },
            {
                path: "/admin/courses",
                element: <AdminCourses />,
            },
            {
                path: "/admin/messages",
                element: <AdminMessages />,
            },

            {
                path: "/admin/Profile",
                element: <AdminProfile />,
            },
            {
                path: "/parent/profile",
                element: <ParentProfile />,
            },

            {
                path: "/Student/profile",
                element: <StudentProfile />,
            },

            {
                path: "/Teacher/profile",
                element: <TeacherProfile />,
            },


            


        ],
    },
    {
        element: <StudentLayout />,
        children: [
            {
                path: "/student",
                element: <StudentHome />,
            },
        ],
    },
    {
        element: <ParentLayout />,
        children: [
            {
                path: "/parent",
                element: <ParentHome />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound/>
    }
]);
