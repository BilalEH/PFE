import {
    Dialog,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import React, { useState } from "react";
import LoadingForTables from "../../../../components/LoadingForTables";
import EmptyTable from "../../../../components/EmptyTable";

function TeacherClassesShowStudents({ handleClose, setHandleClose, students }) {
    // useState for pagination
    const [page, setPage] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(5);

    const columns = [
        { id: "cin", name: "CIN" },
        { id: "firstName", name: "First name" },
        { id: "lastName", name: "Last name" },
        { id: "parent", name: "Parent" },
        { id: "dateN", name: "Birth date" },
        { id: "email", name: "Email" },
        { id: "phone", name: "Phone" },
    ];

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowChange = (event) => {
        setRowPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const closeIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
        >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
        </svg>
    );

    return (
        <>
            <Dialog
                fullScreen
                open={handleClose}
                onClose={() => setHandleClose(false)}
            >
                <div className="popup-container w-100">
                    <DialogTitle>
                        <div className="d-flex justify-content-between w-100 align-items-center">
                            <div className="popup-title">Students list</div>
                            <div className="close-btn-icon">
                                <button onClick={() => setHandleClose(false)}>
                                    {closeIcon}
                                </button>
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className="popup-title">
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
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((col) => (
                                                    <TableCell
                                                        key={col.id}
                                                        style={{
                                                            padding:
                                                                "22px 18px",
                                                            fontWeight: "bold",
                                                            fontFamily:
                                                                "Montserrat",
                                                            fontSize: "16px",
                                                        }}
                                                    >
                                                        {col.name}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {!students ? (
                                                <LoadingForTables />
                                            ) : students.length === 0 ? (
                                                <EmptyTable content="students" />
                                            ) : (
                                                students
                                                    .slice(
                                                        page * rowPerPage,
                                                        page * rowPerPage +
                                                            rowPerPage
                                                    )
                                                    .map((row, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell
                                                                style={{
                                                                    padding:
                                                                        "22px 18px",
                                                                    fontFamily:
                                                                        "Montserrat",
                                                                    fontSize:
                                                                        "16px",
                                                                }}
                                                            >
                                                                {row.user_id.cin
                                                                    ? row
                                                                          .user_id
                                                                          .cin
                                                                    : "N/A"}
                                                            </TableCell>
                                                            <TableCell
                                                                style={{
                                                                    padding:
                                                                        "22px 18px",
                                                                    fontFamily:
                                                                        "Montserrat",
                                                                    fontSize:
                                                                        "16px",
                                                                }}
                                                            >
                                                                {
                                                                    row.user_id
                                                                        .firstName
                                                                }
                                                            </TableCell>
                                                            <TableCell
                                                                style={{
                                                                    padding:
                                                                        "22px 18px",
                                                                    fontFamily:
                                                                        "Montserrat",
                                                                    fontSize:
                                                                        "16px",
                                                                }}
                                                            >
                                                                {
                                                                    row.user_id
                                                                        .lastName
                                                                }
                                                            </TableCell>
                                                            <TableCell
                                                                style={{
                                                                    padding:
                                                                        "22px 18px",
                                                                    fontFamily:
                                                                        "Montserrat",
                                                                    fontSize:
                                                                        "16px",
                                                                }}
                                                            >
                                                                {row.absparent_id
                                                                    ? row
                                                                          .absparent_id
                                                                          .user_id
                                                                          .firstName +
                                                                      " " +
                                                                      row
                                                                          .absparent_id
                                                                          .user_id
                                                                          .lastName
                                                                    : "N/A"}
                                                            </TableCell>
                                                            <TableCell
                                                                style={{
                                                                    padding:
                                                                        "22px 18px",
                                                                    fontFamily:
                                                                        "Montserrat",
                                                                    fontSize:
                                                                        "16px",
                                                                }}
                                                            >
                                                                {row.dateN}
                                                            </TableCell>
                                                            <TableCell
                                                                style={{
                                                                    padding:
                                                                        "22px 18px",
                                                                    fontFamily:
                                                                        "Montserrat",
                                                                    fontSize:
                                                                        "16px",
                                                                }}
                                                            >
                                                                {
                                                                    row.user_id
                                                                        .email
                                                                }
                                                            </TableCell>
                                                            <TableCell
                                                                style={{
                                                                    padding:
                                                                        "22px 18px",
                                                                    fontFamily:
                                                                        "Montserrat",
                                                                    fontSize:
                                                                        "16px",
                                                                }}
                                                            >
                                                                {
                                                                    row.user_id
                                                                        .phone
                                                                }
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    style={{
                                        paddingTop: "20px",
                                        paddingBottom: "10px",
                                    }}
                                    rowsPerPageOptions={[1, 5]}
                                    rowsPerPage={rowPerPage}
                                    page={page}
                                    count={students.length}
                                    component="div"
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleRowChange}
                                />
                            </Paper>
                        </div>
                    </DialogContent>
                </div>
            </Dialog>
        </>
    );
}

export default TeacherClassesShowStudents;
