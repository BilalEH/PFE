import useAuthContext from "../../api/auth";
import ProfilePage from "../../components/Profile/ProfilePage";
function ParentProfile() {
    const { importUser } = useAuthContext();
    return (
        <>
            <ProfilePage />
        </>
    );
}

export default ParentProfile;
