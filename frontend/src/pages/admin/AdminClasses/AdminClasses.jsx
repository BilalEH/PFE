import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addClass,addCourse, GetTeachers, GetCourses } from '../../../api/adminsStore/adminStore';

function AdminClasses() {
  const dispatch = useDispatch();
  const [className, setClassName] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const teachers = useSelector((state) => state.admin.teachers);
  const courses = useSelector((state) => state.admin.courses);

  useEffect(() => {
    dispatch(GetTeachers());
    dispatch(GetCourses());
  }, [dispatch]);

  const handleAddClass = () => {
    // Validate inputs before dispatching action
    if (!className || !selectedTeacher || !selectedCourse) {
      alert('Please fill in all fields');
      return;
    }

    // Dispatch action to add class
    dispatch(addClass({ className, teacherId: selectedTeacher, courseId: selectedCourse }));
  };

  return (
    <div>
      <h2>Add New Class</h2>
      <div>
        <label>Class Name:</label>
        <input type="text" value={className} onChange={(e) => setClassName(e.target.value)} />
      </div>
      <div>
        <label>Select Teacher:</label>
        <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
          <option value="">Select Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Course:</label>
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.courseName}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAddClass}>Add Class</button>
    </div>
  );
}

export default AdminClasses;
