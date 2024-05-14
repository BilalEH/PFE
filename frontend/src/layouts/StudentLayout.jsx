import  { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
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
            props.remove(null);
        }
    }

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
            <div className="row">
                <div className="dashboard pe-0">
                    <div className="dashElement">
                        <Link to="/profile">
                            <div className="d-flex align-items-center justify-content-between p-3">
                                <div>
                                    Profile
                                </div>
                                <div className="dash-icon">
                                    <Avatar alt={${importUser().firstName} ${importUser().lastName}} src={importUser().avatar} />
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="dashElement">
                        <Link to="/student/courses">
                            <div className="d-flex align-items-center justify-content-between p-3 h-100">
                                <div>
                                    Courses
                                </div>
                                <div className="dash-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
                                        <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="dashElement">
                        <Link to="/student/seance">
                            <div className="d-flex align-items-center justify-content-between p-3 h-100">
                                <div>
                                    Courses
                                </div>
                                <div className="dash-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-hourglass-split" viewBox="0 0 16 16">
                                        <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="dashElement">
                        <Link to="/student/payment">
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
