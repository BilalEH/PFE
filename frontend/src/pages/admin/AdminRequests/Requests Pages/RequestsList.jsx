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
import { useState } from "react";
import AcceptPopup from "../AcceptPopup";

function RequestsList({ studentRows }) {
    const [handleClose, setHandleClose] = useState(false);
    const [studentPop, setStudentPop] = useState();
    const [page, setpage] = useState(0);
    const [rowPerPage, setrowPerPage] = useState(5);
    const [showStudents, setShowStudents] = useState(true);

    function handleAcceptStudent(student) {
        setHandleClose(true);
        setStudentPop(student);
    }
    const columns = [
        { id: "cin", name: "CIN" },
        { id: "firstName", name: "First name" },
        { id: "lastName", name: "Last name" },
        { id: "email", name: "Email" },
        { id: "phone", name: "Phone" },
        { id: "actions", name: "Actions" },
    ];
    function handlePageChange(event, newPage) {
        setpage(newPage);
    }
    function handleRowChange(event, newRow) {
        setrowPerPage(event.target.value);
        setpage(0);
    }
    return (
        <div className="w-100">
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
                    <Table className="">
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
                            {studentRows &&
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
                                                    {row.user_id.cin
                                                        ? row.user_id.cin
                                                        : "N/A"}
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
                                                    <button
                                                        onClick={() =>
                                                            handleAcceptStudent(
                                                                row.user_id
                                                            )
                                                        }
                                                        className="table-btn accept"
                                                    >
                                                        Accept
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    style={{
                        paddingTop: "20px",
                        paddingBottom: "10px",
                    }}
                    rowsPerPageOptions={[2, 5]}
                    rowsPerPage={rowPerPage}
                    page={page}
                    count={studentRows && studentRows.length}
                    component="div"
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowChange}
                ></TablePagination>
            </Paper>
            <AcceptPopup
                handleClose={handleClose}
                setHandleClose={setHandleClose}
                studentPop={studentPop}
            ></AcceptPopup>
        </div>
    );
}

export default RequestsList;
