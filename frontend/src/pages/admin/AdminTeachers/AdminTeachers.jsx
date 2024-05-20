import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTeacher, GetTeachers, deleteTeacher } from '../../../api/adminsStore/adminStore';
import { TextField } from '@mui/material';

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

  const handleDeleteTeacher = (teacherId) => {
    dispatch(deleteTeacher(teacherId));
  };

  return (
    <div>
      <h1>Teachers</h1>
      <div>
      <form onSubmit={handleSubmit}>
                    <TextField
                        label="First name"
                        name="firstName"
                        value={newTeacherData.firstName}
                        placeholder="ex: Saad"
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Last name"
                        type="text"
                        name="lastName"
                        value={newTeacherData.lastName}
                        placeholder="ex: Elhafyan"
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={newTeacherData.email}
                        placeholder="ex: dirassa@gmail.com"
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="CIN"
                        type="text"
                        name="cin"
                        value={newTeacherData.cin}
                        placeholder="ex: K000000"
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Phone"
                        type="text"
                        name="phone"
                        value={newTeacherData.phone}
                        placeholder="ex: 0600000000"
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        value={newTeacherData.password}
                        placeholder=""
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
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>CIN</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(teacher => (
                <tr key={teacher.user_id.id}>
                  <td>{teacher.user_id.firstName} {teacher.user_id.lastName}</td>
                  <td>{teacher.user_id.email}</td>
                  <td>{teacher.user_id.cin}</td>
                  <td>{teacher.user_id.phone}</td>
                  <td>
                    <button onClick={() => handleDeleteTeacher(teacher.id)}>Delete</button>
                    <button>update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No teachers available</p>
        )}
      </div>
    </div>
  );
};

export default AdminTeachers;
