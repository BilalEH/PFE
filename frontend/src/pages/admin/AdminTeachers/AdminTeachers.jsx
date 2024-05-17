import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetTeachers } from '../../../api/adminsStore/adminStore';

import "../style/pages.css";

export default function AdminTeachers() {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.admins.teachers);
  const status = useSelector((state) => state.status);

  useEffect(() => {
    dispatch(GetTeachers());
  }, [dispatch]);

  useEffect(() => {
    console.log('Teachers:', teachers);
  }, [teachers]);

//   const handleDelete = (teacherId) => {
//     dispatch(deleteTeacher(teacherId));
//   };

  const handleUpdate = (teacherId) => {
    console.log(`Updating teacher with ID ${teacherId}`);
    // Add your update logic here
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading data</div>;
  }

  if (teachers.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <div className='page-title'>List of Teachers</div>
      <table className="page-table">
        <thead>
          <tr>
            <th></th>
            <th>CIN</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Specialty</th>
            <th>Added at</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td className='icons-td'>
                <button className='table-btn delete' onClick={() => handleDelete(teacher.id)}>
                  Delete
                </button>
                <button className='table-btn update' onClick={() => handleUpdate(teacher.id)}>
                  Update
                </button>
              </td>
              <td>{teacher.user_id.cin}</td>
              <td className='text-capitalize'>{teacher.user_id.firstName}</td>
              <td className='text-capitalize'>{teacher.user_id.lastName}</td>
              <td>{teacher.user_id.email}</td>
              <td>{teacher.user_id.phone}</td>
              <td>{teacher.specialite}</td>
              <td>{new Date(teacher.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
