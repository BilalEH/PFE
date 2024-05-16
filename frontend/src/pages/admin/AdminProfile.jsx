import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAdmins } from '../../api/adminsStore/adminStore'; // Adjust the import path based on your file structure

function AdminProfile() {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.admins);
  const status = useSelector((state) => state.admins.status);

  useEffect(() => {
    dispatch(GetAdmins());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading data</div>;
  }

  const admin = admins[0]; // Assuming there's only one admin, adjust accordingly if needed

  if (!admin) {
    return <div>No admin data available</div>;
  }

  return (
    <div>
      <h2>Admin Profile</h2>
      <div>
        <p><strong>Name:</strong> {admin.name}</p>
        <p><strong>Email:</strong> {admin.email}</p>
      </div>
    </div>
  );
}

export default AdminProfile;
