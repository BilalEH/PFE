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
import AdminHome from "../pages/admin/AdminHome/AdminHome";
import AdminLayout from "../layouts/AdminLayout";
import StudentLayout from "../layouts/StudentLayout";
import ParentLayout from "../layouts/ParentLayout";
import AdminRequests from "../pages/admin/AdminRequests/AdminRequests";
import AdminStudents from "../pages/admin/AdminStudents/AdminStudents";
import AdminTeachers from "../pages/admin/AdminTeachers/AdminTeachers";
import AdminParents from "../pages/admin/AdminParents/AdminParents";
import AdminCourses from "../pages/admin/AdminCourses/AdminCourses";
import AdminMessages from "../pages/admin/AdminMessages/AdminMessages";
import AdminProfile from "../pages/admin/AdminProfile/AdminProfile";
import ParentProfile from "../pages/parent/ParentProfile";
import StudentProfile from "../pages/student/StudentProfile";
import TeacherProfile from "../pages/Teacher/TeacherProfile";
import StudentCourse from "../pages/student/StudentCourse";
import StudentSeance from "../pages/student/StudentSeance";
import StudentPayment from "../pages/student/StudentPayment";
import ParentStudents from "../pages/parent/ParentStudents";
import ParentCourses from "../pages/parent/ParentCourses";
import ParentPayments from "../pages/parent/ParentPayments";
import TeacherLayout from "../layouts/TeacherLayout";
import TeacherStudents from "../pages/Teacher/TeacherStudents";
import TeacherCourses from "../pages/Teacher/TeacherCourses";
import TeacherHome from "../pages/Teacher/TeacherHome";

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
                path: "/admin/Profile",
                element: <AdminProfile />,
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
            }
        ],
    },
    {
        element: <StudentLayout />,
        children: [
            {
                path: "/student",
                element: <StudentHome />,
            },
            {
                path: "student/profile",
                element: <StudentProfile/>
            },
            {
                path: "/student/courses",
                element: <StudentCourse/> 
            },
            {
                path: "/student/seance",
                element: <StudentSeance/>
            },
            {
                path: "/student/payment",
                element: <StudentPayment/>
            }
        ],
    },
    {
        element: <ParentLayout />,
        children: [
            {
                path: "/parent",
                element: <ParentHome />,
            },
            {
                path: "/parent/profile",
                element: <ParentProfile/>
            },
            {
                path: "/parent/students",
                element: <ParentStudents/>
            },
            {
                path: "/parent/courses",
                element: <ParentCourses/>
            },
            {
                path: "/parent/payment",
                element: <ParentPayments/>
            }
        ],
    },
    {
        element: <TeacherLayout/>,
        children: [
            {
                path: "/teacher",
                element: <TeacherHome/>
            },
            {
                path: "/teacher/profile",
                element: <TeacherProfile/>
            },
            {
                path: "/teacher/students",
                element: <TeacherStudents/>
            },
            {
                path: "/teacher/courses",
                element: <TeacherCourses/>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }
]);
