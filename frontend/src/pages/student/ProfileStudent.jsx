import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentData } from './path/to/studentActions';

function ProfileStudent() {
  const dispatch = useDispatch();
  const { studentData, loading, error } = useSelector(state => state.student);

  useEffect(() => {
    dispatch(fetchStudentData());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div> 
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          {studentData && (
            <div>
              <h2>Student Details</h2>
              <p>Name: {studentData.name}</p>
              <p>Age: {studentData.age}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileStudent;
