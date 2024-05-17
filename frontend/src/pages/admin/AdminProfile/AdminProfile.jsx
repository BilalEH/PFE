import { useDispatch, useSelector } from 'react-redux';
import useAuthContext from '../../../api/auth';
import { useEffect } from 'react';
import { GetAdmins } from '../../../api/adminsStore/adminStore';
import { CircularProgress } from '@mui/material';

function AdminProfile() {
  const dispatch = useDispatch();
  const {importUser} =useAuthContext()
  useEffect(() => {
    dispatch(GetAdmins());
  },[])
  const userData = useSelector((state) => state.admins);
  const user=userData.admins.find((e)=>e.user_id.id==importUser().id)
  return (
    <div>
      <h2>Admin Profile</h2>
      {
        userData.status==='succeeded'?(
          <div>
            {
              user?(
                <>
                  <p><strong>lastName:</strong> {user.user_id.lastName}</p>
                  <p><strong>firstName:</strong> {user.user_id.firstName}</p>
                  <p><strong>cin:</strong> {user.user_id.cin}</p>
                  <p><strong>Email:</strong> {user.user_id.email}</p>
                  <p><strong>phone:</strong> {user.user_id.phone}</p>
                  <p><strong>role:</strong> {user.user_id.role}</p>
                  <p><strong>Status:</strong> {user.status==0?'Not verified':'Verified'}</p>
                </>
              ):('error')
            }
          </div>
        ):(userData.status==='failed'?(<div className='w-100 d-flex justify-content-center'>No admin data available</div>):(<div className='w-100 d-flex justify-content-center'><CircularProgress/></div>))
      }
</div>
  );
}

export default AdminProfile;
