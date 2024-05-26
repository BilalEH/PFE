import React from "react";
import useAuthContext from "../../../api/auth";
import { Link } from "react-router-dom";
import ProfileSection from "./components/ProfileSection";
import MessagesSection from "./components/MessagesSection";
import ClassesSection from "./components/ClassesSection";

export default function TeacherHome() {
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
                        <Link to="/teacher/profile">
                            <ProfileSection />
                        </Link>
                    </div>
                </div>
                <div className="col-6 px-2 mb-4">
                    <div className="home-profile-container h-100">
                        <Link to="/teacher/classes">
                            <ClassesSection />
                        </Link>
                    </div>
                </div>
                <div className="col-12 px-2">
                    <div className="home-profile-container h-100">
                        <Link to="/teacher/messages">
                            <MessagesSection />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
