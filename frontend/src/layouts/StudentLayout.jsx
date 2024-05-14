import  { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuthContext from "../api/auth";

export default function StudentLayout() {
    const navigate = useNavigate();
    const { importUser } = useAuthContext();
        useEffect(() => {
        const userTest = importUser();
        if (userTest) {
            if (userTest.role === 'admin') {
                navigate('/admin');
            } else if (userTest.role === 'parent') {
                navigate('/parent');
            } else if (userTest.role === 'teacher') {
                navigate('/teacher');
            }
        }else{
            navigate('/login')
        }
    }, []);
    return (
        <>
            <header>{/* <Heading></Heading> */}</header>
            <main>
                <Outlet></Outlet>
            </main>
        </>
    );
}
