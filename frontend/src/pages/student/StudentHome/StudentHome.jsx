import { useEffect } from "react";
import useAuthContext from "../../../api/auth";
import ProfileSection from "./components/ProfileSection";
import { Link } from "react-router-dom";
import SCoursesTable from "./components/SCoursesTable";
import MessagesSection from "./components/MessagesSection";
export default function StudentHome() {
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
                        <Link to="/student/profile">
                            <ProfileSection />
                        </Link>
                    </div>
                </div>
                <div className="col-6 px-2 mb-4">
                    <div className="home-profile-container h-100">
                        <Link to="/student/courses">
                            <SCoursesTable />
                        </Link>
                    </div>
                </div>
                <div className="col-12 px-2">
                    <div className="home-profile-container h-100">
                        <Link to="/student/messages">
                            <MessagesSection />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
