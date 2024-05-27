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
                        <Link to="/teacher/profile">
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
                        <Link to="/teacher/classes">
                            <ClassesSection />
                        </Link>
                    </div>
                </div>
                <div
                    className="col-12 px-2"
                    data-aos="fade-up"
                    data-aos-easing="ease-out"
                    data-aos-duration="800"
                    data-aos-delay="900"
                >
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
