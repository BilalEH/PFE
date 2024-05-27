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
            <div
                className="page-title"
                data-aos="fade-up"
                data-aos-easing="ease-out"
                data-aos-duration="800"
            >
                Welcome,{" "}
                <span className="title-name">{importUser().firstName}</span>{" "}
                <span className="">{importUser().lastName}</span>
            </div>

            <div className="page-container row">
                <div
                    className="col-6 px-2 mb-4"
                    data-aos="fade-up"
                    data-aos-easing="ease-out"
                    data-aos-duration="800"
                    data-aos-delay="300"
                >
                    <div className="home-profile-container h-100">
                        <Link to="/admin/profile">
                            <ProfileSection />
                        </Link>
                    </div>
                </div>
                <div
                    className="col-6 px-2 mb-4"
                    data-aos="fade-up"
                    data-aos-easing="ease-out"
                    data-aos-duration="800"
                    data-aos-delay="600"
                >
                    <div className="home-profile-container h-100">
                        <Link to="/admin/students">
                            <StudentsTable />
                        </Link>
                    </div>
                </div>
                <div
                    className="col-6 px-2"
                    data-aos="fade-up"
                    data-aos-easing="ease-out"
                    data-aos-duration="800"
                    data-aos-delay="900"
                >
                    <div className="home-profile-container h-100">
                        <Link to="/admin/teachers">
                            <TeacherTable />
                        </Link>
                    </div>
                </div>
                <div
                    className="col-6 px-2"
                    data-aos="fade-up"
                    data-aos-easing="ease-out"
                    data-aos-duration="800"
                    data-aos-delay="1200"
                >
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
