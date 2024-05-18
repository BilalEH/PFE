import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetTeachers, addTeacher } from "../../../api/adminsStore/adminStore";

import "../style/pages.css";
import "../../style/AdminTeacher.css";

export default function AdminTeachers() {
    const dispatch = useDispatch();
    const teachers = useSelector((state) => state.admins.teachers);
    const courses = useSelector((state) => state.admins.courses); // Get courses from Redux store
    const status = useSelector((state) => state.status);

    const [formData, setFormData] = useState({
        cin: "", // Add cin field
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        specialty: "", // Change the field name to specialty
        password: "", // Add password field
    });

    useEffect(() => {
        dispatch(GetTeachers());
    }, [dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTeacher(formData));
    };

    const handleUpdate = (teacherId) => {
        console.log(`Updating teacher with ID ${teacherId}`);
        // Add your update logic here
    };

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error loading data</div>;
    }

    return (
        <div className="admin-teachers-container">
        <table className="page-table">
            <thead>
            <tr>
                <th></th>
                <th>CIN</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Specialty</th>
            </tr>
            </thead>
            <tbody>
            {teachers.map((teacher) => (
                <tr key={teacher.id}>
                <td className='icons-td'>
                    {/* Assuming handleDelete is implemented */}
                    <button className='table-btn delete' onClick={() => handleDelete(teacher.id)}>
                    Delete
                    </button>
                    <button className='table-btn update' onClick={() => handleUpdate(teacher.id)}>
                    Update
                    </button>
                </td>
                <td>{teacher.user_id.cin}</td>
                <td className='text-capitalize'>{teacher.user_id.firstName}</td>
                <td className='text-capitalize'>{teacher.user_id.lastName}</td>
                <td>{teacher.user_id.email}</td>
                <td>{teacher.user_id.phone}</td>
                <td>{teacher.specialite}</td>
                </tr>
            ))}
            </tbody>
        </table>

        <form className="add-teacher-form" onSubmit={handleSubmit}>
            <input type="text" name="cin" value={formData.cin} onChange={handleChange} placeholder="CIN" />
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            <select name="specialty" value={formData.specialty} onChange={handleChange} placeholder="Specialty">
            <option value="">Select Specialty</option>
            {courses.map((course) => (
                <option key={course.id} value={course.courseName}>{course.courseName}</option>
            ))}
            </select>
            <button type="submit">Add Teacher</button>
        </form>
        </div>
    );
}
