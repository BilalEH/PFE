import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
} from "@mui/material";
import PopupStudiantCourses from "./PopupStudiantCourses";
import { useState } from "react";
import StuCourseList from "./StuCourList";
import ParentEmptyStudentsPage from "./ParentEmptyStudentsPage";

function P_StudentsList({ StudentsData }) {
    const [handleClose, sethandleClose] = useState(false);
    const [StudentSelected, setStudentSelected] = useState({
        id: "",
        name: "",
    });
    const [page, setPage] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(5);

    const columns = [
        { id: "firstName", name: "First name" },
        { id: "lastName", name: "Last name" },
        { id: "email", name: "Email" },
        { id: "phone", name: "Phone" },
        { id: "cin", name: "CIN" },
        { id: "dateN", name: "Birth date" },
        { id: "status", name: "Status" },
        { id: "actions", name: "" },
    ];

    const ShowStudCourns = (id, name) => {
        setStudentSelected({ id: id, name: name });
        sethandleClose(true);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowChange = (event) => {
        setRowPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
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
                                            padding: "22px 18px",
                                            fontWeight: "bold",
                                            fontFamily: "Montserrat",
                                            fontSize: "16px",
                                        }}
                                    >
                                        {col.name}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {StudentsData.length === 0 ? (
                                <ParentEmptyStudentsPage />
                            ) : (
                                StudentsData.slice(
                                    page * rowPerPage,
                                    page * rowPerPage + rowPerPage
                                ).map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell
                                            style={{
                                                padding: "22px 18px",
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",
                                            }}
                                        >
                                            {row.user_id.firstName}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                padding: "22px 18px",
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",
                                            }}
                                        >
                                            {row.user_id.lastName}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                padding: "22px 18px",
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",
                                            }}
                                        >
                                            {row.user_id.email}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                padding: "22px 18px",
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",
                                            }}
                                        >
                                            {row.user_id.phone}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                padding: "22px 18px",
                                                fontFamily: "Montserrat",
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
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",
                                            }}
                                        >
                                            {row.dateN}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                padding: "22px 18px",
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",
                                            }}
                                        >
                                            {row.status == 1
                                                ? "verifie"
                                                : "non verifie"}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                padding: "22px 18px",
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",
                                            }}
                                        >
                                            <Tooltip
                                                title={`List of courses the ${row.user_id.firstName} is taking`}
                                                arrow
                                            >
                                                <Button
                                                    disabled={row.status == 0}
                                                    style={
                                                        row.status == 1
                                                            ? {
                                                                  backgroundColor:
                                                                      "#19647e",
                                                                  color: "white",
                                                              }
                                                            : {}
                                                    }
                                                    variant="contained"
                                                    onClick={() =>
                                                        ShowStudCourns(
                                                            row.id,
                                                            `${row.user_id.firstName} ${row.user_id.lastName}`
                                                        )
                                                    }
                                                >
                                                    courses
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    style={{ paddingTop: "20px", paddingBottom: "10px" }}
                    rowsPerPageOptions={[1, 5]}
                    rowsPerPage={rowPerPage}
                    page={page}
                    count={StudentsData.length}
                    component="div"
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowChange}
                />
            </Paper>
            <PopupStudiantCourses
                sethandleClose={sethandleClose}
                handleClose={handleClose}
                title={`List of courses taught to ${StudentSelected.name}`}
            >
                <StuCourseList id={StudentSelected.id} />
            </PopupStudiantCourses>
        </>
    );
}

export default P_StudentsList;
