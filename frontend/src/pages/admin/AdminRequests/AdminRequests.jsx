import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetStudents } from "../../../api/adminsStore/adminStore";
import "../style/pages.css";

export default function AdminRequests() {
    const [studentRows, setStudentRows] = useState([]);
    const [page, setpage] = useState(0);
    const [rowPerPage, setrowPerPage] = useState(5);
    const [showStudents, setShowStudents] = useState(true);

    const dispatch = useDispatch();
    const students = useSelector((state) => state.admins.students);
    const status = useSelector((state) => state.status);
    const columns = [
        { id: "cin", name: "CIN" },
        { id: "firstName", name: "First name" },
        { id: "lastName", name: "Last name" },
        { id: "email", name: "Email" },
        { id: "phone", name: "Phone" },
        { id: "actions", name: "" },
    ];

    useEffect(() => {
        dispatch(GetStudents());
    }, [dispatch]);

    useEffect(() => {
        setStudentRows(students.filter((student) => student.status === 0));
        console.log(studentRows);
    }, [students]);

    function handlePageChange(event, newPage) {
        setpage(newPage);
    }

    function handleRowChange(event, newRow) {
        setrowPerPage(event.target.value);
        setpage(0);
    }

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error loading data</div>;
    }

    if (students.length === 0) {
        return (
            <>
                <div className="page-title">Requests list</div>
                <div className="loading d-flex justify-content-center align-items-center">
                    <span>Loading...</span>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="page-title">Requests list</div>

            <Paper
                style={{
                    background: "none",
                    border: "2px solid #afafaf",
                    borderRadius: "12px",
                    overflow: "hidden",
                }}
                sx={{ width: "100%" }}
            >
                <TableContainer>
                    <Table className="page-table">
                        <TableHead>
                            <TableRow>
                                {columns.map((col) => (
                                    <TableCell
                                        style={{
                                            padding: "22px 18px",
                                            fontWeight: "bold",
                                            fontFamily: "Montserrat",
                                            fontSize: "16px",
                                        }}
                                        key={col.id}
                                    >
                                        {col.name}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {showStudents &&
                                studentRows
                                    .slice(
                                        page * rowPerPage,
                                        page * rowPerPage + rowPerPage
                                    )
                                    .map((row, i) => {
                                        return (
                                            <TableRow key={i}>
                                                <TableCell
                                                    style={{
                                                        padding: "22px 18px",
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    {row.user_id.cin}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        padding: "22px 18px",
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    {row.user_id.firstName}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        padding: "22px 18px",
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    {row.user_id.lastName}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        padding: "22px 18px",
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    {row.user_id.email}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        padding: "22px 18px",
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    {row.user_id.phone}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        padding: "22px 18px",
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    actions
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
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
                ></TablePagination>
            </Paper>
        </>
    );
}
