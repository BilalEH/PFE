import  { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./style/dashboard.css"
import { Avatar } from "@mui/material";
import useAuthContext from "../api/auth";

export default function StudentLayout() {
    const navigate = useNavigate();
    const { importUser } = useAuthContext();
    const { logout } = useAuthContext();

    const logoutEvent =async () => {
        const TestLogout=await logout();
        if(TestLogout){
            navigate("/login")
        }
    }

        useEffect(() => {
        const userTest = importUser();
        if (userTest) {
            if (userTest.role === 'admin') {
                navigate('/admin');
            } else if (userTest.role === 'student') {
                navigate('/student') ;
            } else if (userTest.role === 'teacher') {
                navigate('/teacher');
            }
        }else{
            navigate('/login')
        }
    }, []);
    // className={`dashElement ${pathname == "/admin/requests_courses"? "dashElementActive": ""}`}>
    const { pathname } = useLocation();
    return (
        <>
            <div className="row">
                <div className="dashboard pe-0">
                    <div className={`dashElement ${pathname == "/parent/profile"? "dashElementActive": ""}`}>
                        <Link to="/parent/profile">
                            <div className="d-flex align-items-center justify-content-between p-3">
                                <div>
                                    Profile
                                </div>
                                <div className="dash-icon">
                                    <Avatar alt={`${importUser()&&importUser().firstName} ${importUser()&&importUser().lastName}`} src={importUser()&&importUser().avatar} />
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={`dashElement ${pathname == "/parent/students"? "dashElementActive": ""}`}>
                        <Link to="/parent/students">
                            <div className="d-flex align-items-center justify-content-between p-3 h-100">
                                <div>
                                    Students
                                </div>
                                <div className="dash-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-backpack" viewBox="0 0 16 16">
                                        <path d="M4.04 7.43a4 4 0 0 1 7.92 0 .5.5 0 1 1-.99.14 3 3 0 0 0-5.94 0 .5.5 0 1 1-.99-.14M4 9.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm1 .5v3h6v-3h-1v.5a.5.5 0 0 1-1 0V10z"/>
                                        <path d="M6 2.341V2a2 2 0 1 1 4 0v.341c2.33.824 4 3.047 4 5.659v5.5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5V8a6 6 0 0 1 4-5.659M7 2v.083a6 6 0 0 1 2 0V2a1 1 0 0 0-2 0m1 1a5 5 0 0 0-5 5v5.5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5V8a5 5 0 0 0-5-5"/>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={`dashElement ${pathname == "/parent/courses"? "dashElementActive": ""}`}>
                        <Link to="/parent/courses">
                            <div className="d-flex align-items-center justify-content-between p-3 h-100">
                                <div>
                                    Courses
                                </div>
                                <div className="dash-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-book" viewBox="0 0 16 16">
                                        <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={`dashElement ${pathname == "/parent/payment"? "dashElementActive": ""}`}>
                        <Link to="/parent/payment">
                            <div className="d-flex align-items-center justify-content-between p-3 h-100">
                                <div>
                                    Payments
                                </div>
                                <div className="dash-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-credit-card-fill" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1"/>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </div>




                    <div className={`dashElement ${pathname == "/parent/messages"? "dashElementActive": ""}`}>
                        <Link to="/parent/messages">
                            <div className="d-flex align-items-center justify-content-between p-3 h-100">
                                <div>
                                messages
                                </div>
                                <div className="dash-icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        fill="currentColor"
                                        className="bi bi-chat-left-dots-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </div>






                    <div className="dashElement">
                        <button className="logoutBtn" onClick={logoutEvent}>
                            <div className="d-flex p-3 justify-content-between align-items-center">
                                <p className="m-0">Log out</p>
                                <div className="logout-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16"><path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/><path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/></svg>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            










            <main className="pages">
                <Outlet></Outlet>
            </main>
        </>
    );
}
