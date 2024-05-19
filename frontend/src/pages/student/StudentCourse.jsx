import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SGetCourses } from '../../api/StudentStore/Student';

export default function StudentCourse() {
  const dispatch = useDispatch();
//   const courses = useSelector((state) => state.studentsSlice.courses);
const courses = useSelector((state) => state);  console.log(courses)

  const status = useSelector((state) => state.studentsSlice.status);
  

  useEffect(() => {
    dispatch(SGetCourses());
  }, [dispatch]);

  return (
    <>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error loading courses</div>}
      {status === 'succeeded' && (
        <div>
          <h2>Courses</h2>
          <ul>
            {courses.map((course) => (
              <li key={course.id}>
                {course.courseName} - {course.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
