import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetStudents } from '../../api/adminsStore/adminStore';

function StudentProfile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetStudents());
  },[]);
  const studentsData = useSelector((state) => state.studentsSlice);
  if (!studentsData.student[0]) {
    return <div>No student data available</div>;
  }

  return (
    <div>
      <h2>Student Profile</h2>
      <div>
        <p><strong>Name:</strong> {studentsData.student[0].name}</p>
        <p><strong>Age:</strong> {studentsData.student[0].age}</p>
        <p><strong>Grade:</strong> {studentsData.student[0].grade}</p>
        {/* Add more profile information here */}
      </div>
    </div>
  );
}

export default StudentProfile;
