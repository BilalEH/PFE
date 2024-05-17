import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    GetStudents,
    deleteStudent,
    updateStudent,
} from "../../../api/adminsStore/adminStore";

import "../style/pages.css";

export default function AdminStudents() {
    const dispatch = useDispatch();
    const students = useSelector((state) => state.admins.students);
    const status = useSelector((state) => state.status);

    useEffect(() => {
        dispatch(GetStudents());
    }, [dispatch]);

    useEffect(() => {
        console.log("Students:", students);
    }, [students]);

    const handleDelete = (studentId) => {
        dispatch(deleteStudent(studentId));
    };

    const handleUpdate = (studentId) => {
        dispatch(updateStudent(studentId));
    };

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error loading data</div>;
    }

    if (students.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div>
            <div className="page-title">List of Students</div>
            <table className="page-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>CIN</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Birth date</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Added at</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) =>
                        student.status ? (
                            <tr key={student.id}>
                                <td className="icons-td">
                                    <button
                                        className="table-btn delete"
                                        onClick={() => handleDelete(student.id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            className="bi bi-trash"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                        </svg>
                                    </button>
                                    <button
                                        className="table-btn update"
                                        onClick={() => handleUpdate(student.id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            className="bi bi-pencil-square"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                            />
                                        </svg>{" "}
                                    </button>
                                </td>
                                <td>{student.user_id.cin}</td>
                                <td className="text-capitalize">
                                    {student.user_id.firstName}
                                </td>
                                <td className="text-capitalize">
                                    {student.user_id.lastName}
                                </td>
                                <td>{student.dateN}</td>
                                <td>{student.user_id.email}</td>
                                <td>{student.user_id.phone}</td>
                                <td>
                                    {new Date(
                                        student.created_at
                                    ).toLocaleDateString()}
                                </td>
                            </tr>
                        ) : (
                            ""
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}