import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetCourses, addCourse, deleteCourse, updateCourse } from '../../../api/adminsStore/adminStore';
import "../style/AdminCourses.css";
import "../style/pages.css";


export default function AdminCourses() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.admins.courses);
  const status = useSelector((state) => state.status);

  const [formData, setFormData] = useState({
    courseName: '',
    description: '',
    niveau: '',
    amount: '',
  });

  useEffect(() => {
    dispatch(GetCourses());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCourse(formData));
    // Clear form data after submission
    setFormData({
      courseName: '',
      description: '',
      niveau: '',
      amount: '',
    });
  };

  const handleDelete = (courseId) => {
    dispatch(deleteCourse(courseId));
  };

  const handleUpdate = (courseId) => {
    // Implement update logic here
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading data</div>;
  }

  return (
    <div className="admin-courses-container">
      <h2>Courses</h2>

      {/* Form for adding a new course */}
      <form onSubmit={handleSubmit} className="course-form">
        <input type="text" name="courseName" value={formData.courseName} onChange={handleChange} placeholder="Course Name" />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input type="text" name="niveau" value={formData.niveau} onChange={handleChange} placeholder="Niveau" />
        <input type="text" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" />
        <button type="submit">Add Course</button>
      </form>

      {/* List of courses */}
      <table className="course-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Description</th>
            <th>Niveau</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.courseName}</td>
              <td>{course.description}</td>
              <td>{course.niveau}</td>
              <td>{course.amount}</td>
              <td className="course-actions">
                <button onClick={() => handleUpdate(course.id)}>Update</button>
                <button onClick={() => handleDelete(course.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
