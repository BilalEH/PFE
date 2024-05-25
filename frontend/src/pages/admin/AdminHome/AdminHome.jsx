import React from "react";
import useAuthContext from "../../../api/auth";

import "./style/AdminHome.css";
import { Link } from "react-router-dom";
import StudentsTable from "./components/StudentsTable";
import ProfileSection from "./components/ProfileSection";
import TeacherTable from "./components/TeacherTable";
import CoursesTable from "./components/CoursesTable";

export default function AdminHome() {
    const { importUser } = useAuthContext();
    return (
        <>
            <div className="page-title">
                Welcome,{" "}
                <span className="title-name">{importUser().firstName}</span>{" "}
                <span className="">{importUser().lastName}</span>
            </div>

            <div className="page-container row">
                <div className="col-6 px-2 mb-4">
                    <div className="home-profile-container h-100">
                        <Link to="/admin/profile">
                            <ProfileSection />
                        </Link>
                    </div>
                </div>
                <div className="col-6 px-2 mb-4">
                    <div className="home-profile-container h-100">
                        <Link to="/admin/students">
                            <StudentsTable />
                        </Link>
                    </div>
                </div>
                <div className="col-6 px-2">
                    <div className="home-profile-container h-100">
                        <Link to="/admin/teachers">
                            <TeacherTable />
                        </Link>
                    </div>
                </div>
                <div className="col-6 px-2">
                    <div className="home-profile-container h-100">
                        <Link to="/admin/courses">
                            <CoursesTable />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
