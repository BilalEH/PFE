import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SGetCourses } from '../../api/StudentStore/Student';

export default function StudentCourse() {
  const dispatch = useDispatch();
  const coursesData = useSelector((state) => state.students);
  console.log(coursesData);

  useEffect(() => {
    dispatch(SGetCourses());
  }, [dispatch]);

  return (
    <>
      <h2>Courses</h2>
    </>
  );
}
