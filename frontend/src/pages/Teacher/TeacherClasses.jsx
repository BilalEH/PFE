import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { axiosInstance } from '../../api/axios';
import { GetStudents } from '../../api/adminsStore/adminStore'; // Import the thunk action to fetch students

function TeacherClasses() {
  const [classes, setClasses] = useState([]);
  const students = useSelector((state) => state.students); // Get students from the Redux store
  const dispatch = useDispatch();

  const handlerdisplaystudents = (idclass) => {
    console.log(idclass);
    console.log(idclass.student_classes.firstName);
  };

  useEffect(() => {
    // Function to fetch classes
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
            <th>action</th>
            {/* Add more table headers if needed */}
          </tr>
        </thead>
        <tbody>
          {classes.map((classe) => (
            <tr key={classe.id}>
              <td>{classe.id}</td>
              <td>{classe.className}</td>
              <td><button onClick={() => handlerdisplaystudents(classe.id)}>show students</button></td>
              {/* Add more table cells if needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherClasses;
