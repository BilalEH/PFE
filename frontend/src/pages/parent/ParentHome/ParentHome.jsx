import { Link } from "react-router-dom";
import useAuthContext from "../../../api/auth";
import ProfileSection from "./components/ProfileSection";
import { PStudentClasses } from "../../../api/parentsStore/parentStore";
import PStudentsTable from "./components/PStudentsTable";
import MessagesSection from "../../student/StudentHome/components/MessagesSection";

export default function ParentHome() {
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
                        <Link to="/parent/profile">
                            <ProfileSection />
                        </Link>
                    </div>
                </div>
                <div className="col-6 px-2 mb-4">
                    <div className="home-profile-container h-100">
                        <Link to="/parent/students">
                            <PStudentsTable />
                        </Link>
                    </div>
                </div>
                <div className="col-12 px-2">
                    <div className="home-profile-container h-100">
                        <Link to="/parent/messages">
                            <MessagesSection />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
