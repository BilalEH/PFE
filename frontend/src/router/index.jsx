import {createBrowserRouter} from "react-router-dom";
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

export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
    {
        path:"/",
        element: <Home/>
    },
    {
        path:"/login",
        element: <Login/>
    },
    {
        path:"/signup",
        element: <Signup/>
    },
    {
        path:"/users",
        element: <Users/>
    },
    {
        path: "*",
        element: <NotFound/>
    },
    {
        path: "/Contactus",
        element: <ContactUs/>
    },
    {
        path : "/student",
        element: <StudentHome/>
    },
    {
        path:"/parent",
        element: <ParentHome/>
    },
    {
        path: "/admin",
        element: <AdminHome/>
    }
        ]
    }
])
