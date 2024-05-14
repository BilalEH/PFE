import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeachers } from './teacherSlice';

function TeacherProfile() {
  const dispatch = useDispatch();
  const { teachers, status, error } = useSelector((state) => state.teachers);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTeachers());
    }
  }, [status, dispatch]);

  return (
    <div>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      {status === 'succeeded' && (
        <ul>
          {teachers.map((teacher) => (
            <li key={teacher.id}>{teacher.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TeacherProfile;
