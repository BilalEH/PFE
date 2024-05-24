import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { axiosInstance } from '../../api/axios';
import { GetStudents } from '../../api/adminsStore/adminStore';
import TeacherClassesShowStudents from './TeacherClassesShowStudents';

function TeacherClasses() {
  const [classes, setClasses] = useState([]);
  const [selectedClassStudents, setSelectedClassStudents] = useState([]);
  const dispatch = useDispatch();

  const handlerdisplaystudents = async (idclass) => {
    try {
      const response = await axiosInstance.get(`/api/classe/get-students/${idclass}`);
      setSelectedClassStudents(response.data.students);
      console.log(`Students in class ${idclass}:`, response.data.students);
    } catch (error) {
      console.error('Error fetching students for class:', error);
    }
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosInstance.get('/api/classes');
        setClasses(response.data.classes);
        dispatch(GetStudents()); // Dispatch the thunk action to fetch students
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses(); // Call the fetchClasses function when the component mounts
  }, [dispatch]); // Pass dispatch as a dependency to useEffect

  return (
    <div>
      <h2>Classes</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Class Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classe) => (
            <tr key={classe.id}>
              <td>{classe.id}</td>
              <td>{classe.className}</td>
              <td>
                <button onClick={() => handlerdisplaystudents(classe.id)}>Show Students</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedClassStudents.length > 0 && (
        <TeacherClassesShowStudents students={selectedClassStudents} />
      )}
    </div>
  );
}

export default TeacherClasses;
