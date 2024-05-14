import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetStudents } from '../../api/adminsStore/adminStore';

export default function AdminStudents() {
    const dispatch = useDispatch();
    const students = useSelector((state) => state.admins.students);
    const status = useSelector((state) => state.status);

    useEffect(() => {
        dispatch(GetStudents());
    }, [dispatch]);

    useEffect(() => {
        console.log('Students:', students);
    }, [students]);

    const handleDelete = (studentId) => {
        // Add your delete logic here
        console.log(`Deleting student with ID ${studentId}`);
    };

    const handleUpdate = (studentId) => {
        // Add your update logic here
        console.log(`Updating student with ID ${studentId}`);
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error loading data</div>;
    }

    if (students.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div>
            <h2>List of Students</h2>
            <table className="student-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>CIN</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.user_id.firstName}</td>
                            <td>{student.user_id.lastName}</td>
                            <td>{student.user_id.email}</td>
                            <td>{student.user_id.phone}</td>
                            <td>{student.user_id.cin}</td>
                            <td>
                                <button onClick={() => handleUpdate(student.id)}>Update</button>
                                <button onClick={() => handleDelete(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
