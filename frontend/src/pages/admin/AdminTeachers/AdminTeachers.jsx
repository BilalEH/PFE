import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTeacher, GetTeachers } from '../../../api/adminsStore/adminStore';

const AdminTeachers = () => {
  const [newTeacherData, setNewTeacherData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cin: '',
    phone: '',
    password: '',
    role: 'teacher'
  });
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.admins.teachers);
  const status = useSelector((state) => state.status_teacher);

  useEffect(() => {
    dispatch(GetTeachers());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacherData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTeacher(newTeacherData));
    // Clear form data after submission
    setNewTeacherData({
      firstName: '',
      lastName: '',
      email: '',
      cin: '',
      phone: '',
      password: '',
      role: 'teacher'
    });
  };

  return (
    <div>
      <h1>Teachers</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={newTeacherData.firstName}
            placeholder="First Name"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            value={newTeacherData.lastName}
            placeholder="Last Name"
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            value={newTeacherData.email}
            placeholder="Email"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="cin"
            value={newTeacherData.cin}
            placeholder="CIN"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phone"
            value={newTeacherData.phone}
            placeholder="Phone"
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            value={newTeacherData.password}
            placeholder="Password"
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Teacher</button>
        </form>
      </div>
      <div>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error fetching teachers</p>}
        {teachers && teachers.length > 0 ? (
          teachers.map(teacher => (
            <div key={teacher.id}>
              <h2>{teacher.name}</h2>
              {/* {teacher.cin ? <p>CIN: {teacher.cin}</p> : <p>No CIN available</p>} */}
            </div>
          ))
        ) : (
          <p>No teachers available</p>
        )}
      </div>
    </div>
  );
};

export default AdminTeachers;
