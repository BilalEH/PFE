import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTeacher, GetTeachers } from "../../../api/adminsStore/adminStore";

const AdminTeachers = () => {
    const [handleClose, setHandleClose] = useState(false);

    const dispatch = useDispatch();
    const teachers = useSelector((state) => state.admins.teachers);
    const status = useSelector((state) => state.status_teacher);

    useEffect(() => {
        dispatch(GetTeachers());
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTeacherData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTeacher(newTeacherData));
        // Clear form data after submission
        setNewTeacherData({
            firstName: "",
            lastName: "",
            email: "",
            cin: "",
            phone: "",
            password: "",
            role: "teacher",
        });
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <div className="page-title">Teachers</div>
                <div className="add-teacher-btn">
                    <button
                        className="d-flex align-items-center me-2"
                        onClick={() => setHandleClose(true)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-plus-circle"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                        <p className="m-0 ms-2">Add teacher</p>
                    </button>
                </div>
                <AddTeacherPopup
                    handleClose={handleClose}
                    setHandleClose={setHandleClose}
                    dispatch={dispatch}
                />
            </div>
            <div>
                {status === "loading" && <p>Loading...</p>}
                {status === "failed" && <p>Error fetching teachers</p>}
                {teachers && teachers.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>CIN</th>
                                <th>Phone</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map((teacher) => (
                                <tr key={teacher.user_id.id}>
                                    <td>
                                        {teacher.user_id.firstName}{" "}
                                        {teacher.user_id.lastName}
                                    </td>
                                    <td>{teacher.user_id.email}</td>
                                    <td>{teacher.user_id.cin}</td>
                                    <td>{teacher.user_id.phone}</td>
                                    <td>
                                        <button>delete</button>{" "}
                                        <button>update</button>
                                    </td>
                                    {/* Add more table cells as needed */}
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
