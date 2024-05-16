import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetStudents } from 'path/to/adminSlice'; // Adjust the import path based on your file structure

function StudentProfile() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.studentsSlice.students); // Assuming the key is 'students' in your slice state
  const status = useSelector((state) => state.studentsSlice.status);

  useEffect(() => {
    dispatch(GetStudents());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading data</div>;
  }

  const student = students[0]; // Assuming there's only one student, adjust accordingly if needed

  if (!student) {
    return <div>No student data available</div>;
  }

  return (
    <div>
      <h2>Student Profile</h2>
      <div>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Age:</strong> {student.age}</p>
        <p><strong>Grade:</strong> {student.grade}</p>
        {/* Add more profile information here */}
      </div>
    </div>
  );
}

export default StudentProfile;
