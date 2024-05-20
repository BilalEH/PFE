import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./style/dashboard.css";
import { Avatar } from "@mui/material";
import useAuthContext from "../api/auth";

export default function TeacherLayout() {
    const navigate = useNavigate();
    const { importUser, logout } = useAuthContext();

    useEffect(() => {
        const userTest = importUser();
        if (userTest) {
            if (userTest.role === 'student') {
                navigate('/student');
            } else if (userTest.role === 'admin') {
                navigate('/admin');
            } else if (userTest.role === 'parent') {
                navigate('/parent');
            }
        }else{
            navigate("/login");
        }
    }, []);

    const logoutEvent = async () => {
        const TestLogout = await logout();
        if (TestLogout) {
            navigate("/login");
        }
    };
    return (
        <>
            <div className="row">
                <div className="dashboard pe-0">
                    <div className="dashElement">
                        <Link to="/teacher/profile">
                            <div className="d-flex align-items-center justify-content-between p-3">
                                <div>Profile</div>
                                <div className="dash-icon">
                                    <Avatar
                                        alt={`${
                                            importUser() &&
                                            importUser().firstName
                                        } ${
                                            importUser() &&
                                            importUser().lastName
                                        }`}
                                        src={
                                            importUser() && importUser().avatar
                                        }
                                    />
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="dashElement">
                        <Link to="/teacher/students">
                            <div className="d-flex align-items-center justify-content-between p-3 h-100">
                                <div>Students</div>
                                <div className="dash-icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        fill="currentColor"
                                        className="bi bi-inbox-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4zm-1.17-.437A1.5 1.5 0 0 1 4.98 3h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374z" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="dashElement">
                        <Link to="/teacher/classes">
                        <div className="d-flex align-items-center justify-content-between p-3 h-100">
                                <div>Classes</div>
                                <div className="dash-icon">
                                    <svg
                                        className="w-6 h-6 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="dashElement">
                        <Link to="/teacher/messages">
                            <div className="d-flex align-items-center justify-content-between p-3 h-100">
                                <div>Messages</div>
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
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="bi bi-box-arrow-right"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                                        />
                                    </svg>
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
