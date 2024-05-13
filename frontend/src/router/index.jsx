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
