import React from "react";
import useAuthContext from "../../api/auth";
import ProfilePage from "../../components/Profile/ProfilePage";

function TeacherProfile() {
    const { importUser } = useAuthContext();
    return (
        <>
            <ProfilePage />
        </>
    );
}

export default TeacherProfile;
