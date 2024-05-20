import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetStudents, deleteStudent, updateStudent } from "../../../api/adminsStore/adminStore";
import { Alert, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import ConfDelete from "./ConfDelete";

export default function AdminStudents() {
    const [studentRows, setStudentRows] = useState([]);
    const dispatch = useDispatch();
    const studentsData = useSelector((state) => state.admins);
    const [page, setPage] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(5);

    const columns = [
        { id: "actions", name: "" },
        { id: "cin", name: "CIN" },
        { id: "firstName", name: "First name" },
        { id: "lastName", name: "Last name" },
        { id: "dateN", name: "Birth date" },
        { id: "email", name: "Email" },
        { id: "phone", name: "Phone" },
    ];

    useEffect(() => {
        dispatch(GetStudents());
    }, [dispatch]);

    useEffect(() => {
        setStudentRows(studentsData.students);
    }, [studentsData]);

    const handleDelete = (studentId) => {
        dispatch(deleteStudent(studentId));
    };

    const handleUpdate = (studentId) => {
        dispatch(updateStudent(studentId));
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowChange = (event) => {
        setRowPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const deleteIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
    );

    const updateIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
        </svg>
    );

    if (studentsData.status_student === 'failed') {
        return <Alert severity="error">Error loading data.</Alert>;
    } else if (studentsData.status_student === 'loading') {
        return <CircularProgress size={50} />;
    } else if (studentsData.students.length === 0) {
        return <Alert severity="warning">No data available.</Alert>;
    }

    return (
        <div>
            <div className="page-title">List of Students</div>
            <Paper style={{ background: "none", border: "2px solid #afafaf", borderRadius: "12px", overflow: "hidden" }} sx={{ width: "100%" }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((col) => (
                                    <TableCell key={col.id} style={{ padding: "22px 18px", fontWeight: "bold", fontFamily: "Montserrat", fontSize: "16px" }}>{col.name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {studentRows.slice(page * rowPerPage, page * rowPerPage + rowPerPage).map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell style={{ padding: "22px 18px", fontFamily: "Montserrat", fontSize: "16px" }}>
                                        <button className="delete" onClick={() => handleDelete(row.id)}>{deleteIcon}</button>
                                        <button className="update" onClick={() => handleUpdate(row.id)}>{updateIcon}</button>
                                    </TableCell>
                                    <TableCell style={{ padding: "22px 18px", fontFamily: "Montserrat", fontSize: "16px" }}>{row.user_id.cin}</TableCell>
                                    <TableCell style={{ padding: "22px 18px", fontFamily: "Montserrat", fontSize: "16px" }}>{row.user_id.firstName}</TableCell>
                                    <TableCell style={{ padding: "22px 18px", fontFamily: "Montserrat", fontSize: "16px" }}>{row.user_id.lastName}</TableCell>
                                    <TableCell style={{ padding: "22px 18px", fontFamily: "Montserrat", fontSize: "16px" }}>{row.dateN}</TableCell>
                                    <TableCell style={{ padding: "22px 18px", fontFamily: "Montserrat", fontSize: "16px" }}>{row.user_id.email}</TableCell>
                                    <TableCell style={{ padding: "22px 18px", fontFamily: "Montserrat", fontSize: "16px" }}>{row.user_id.phone}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    style={{ paddingTop: "20px", paddingBottom: "10px" }}
                    rowsPerPageOptions={[1, 5]}
                    rowsPerPage={rowPerPage}
                    page={page}
                    count={studentRows.length}
                    component="div"
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowChange}
                />
            </Paper>
        </div>
    );
}
