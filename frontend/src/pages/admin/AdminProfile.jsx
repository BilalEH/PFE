import { useDispatch, useSelector } from 'react-redux';
import useAuthContext from '../../api/auth';
import { useEffect } from 'react';
import { GetAdmins } from '../../api/adminsStore/adminStore';

function AdminProfile() {
  const dispatch = useDispatch();
  const {importUser} =useAuthContext()
  useEffect(() => {
    dispatch(GetAdmins());
  },[])
  const userData = useSelector((state) => state.admins);
  console.log(userData);
  if (userData.status!='succeeded') {
    return <div>No admin data available</div>;
  }
  const user=userData.admins.find((e)=>e.user_id.id==importUser().id)
  return (
    <div>
      <h2>Admin Profile</h2>
      <div>
        <p><strong>lastName:</strong> {user.user_id.lastName}</p>
        <p><strong>firstName:</strong> {user.user_id.firstName}</p>
        <p><strong>cin:</strong> {user.user_id.cin}</p>
        <p><strong>Email:</strong> {user.user_id.email}</p>
        <p><strong>phone:</strong> {user.user_id.phone}</p>
        <p><strong>role:</strong> {user.user_id.role}</p>
      </div>
    </div>
  );
}

export default AdminProfile;
