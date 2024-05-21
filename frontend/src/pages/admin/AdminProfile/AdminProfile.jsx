import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuthContext from '../../../api/auth';
import { useEffect } from 'react';
import { GetAdmins } from '../../../api/adminsStore/adminStore';
import { CircularProgress } from '@mui/material';
import './AdminprofilStyle.css'; 

function AdminProfile() {
  const dispatch = useDispatch();
  const { importUser } = useAuthContext();

  useEffect(() => {
    dispatch(GetAdmins());
  }, []);

  const userData = useSelector((state) => state.admins);
  const user = userData.admins.find((e) => e.user_id.id == importUser().id);

  return (
    <div className="container">
      <h2>Admin Profile</h2>
      {userData.status_admin === 'succeeded' ? (
        <div className="profile-info">
          {user ? (
            <>
              <p><strong>Last Name:</strong> {user.user_id.lastName}</p>
              <p><strong>First Name:</strong> {user.user_id.firstName}</p>
              <p><strong>CIN:</strong> {user.user_id.cin}</p>
              <p><strong>Email:</strong> {user.user_id.email}</p>
              <p><strong>Phone:</strong> {user.user_id.phone}</p>
              <p><strong>Role:</strong> {user.user_id.role}</p>
              <p><strong>Status:</strong> {user.status == 0 ? 'Not verified' : 'Verified'}</p>
            </>
          ) : (
            <div className="error-message">Error: User not found</div>
          )}
        </div>
      ) : userData.status_admin === 'failed' ? (
        <div className="error-message">No admin data available</div>
      ) : (
        <div className="loading-spinner"><CircularProgress /></div>
      )}
    </div>
  );
}

export default AdminProfile;
