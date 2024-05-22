import { useState } from "react";
import { useDispatch } from "react-redux";
import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import EmptyCoursesPage from "./EmptyCoursesPage";
import "../style/CoursesList.css";
import ReserveCoursePopup from "./ReserveCoursePopup";

function ParentCouresList({ CouresData, studentData, status }) {
    const [active, setActive] = useState(false);
    const [CouresSelected, setCouresSelected] = useState(0);

    // useState for popup
    const [handleClose, setHandleClose] = useState(false);
    const [courseSelected, setCourseSelected] = useState();

    // useState for pagination
    const [page, setpage] = useState(0);
    const [rowPerPage, setrowPerPage] = useState(5);

    const dispatch = useDispatch();

    const columns = [
        { id: "courseName", name: "Course name" },
        { id: "description", name: "description" },
        { id: "amount", name: "Amount" },
        { id: "niveau", name: "Level" },
        { id: "actions", name: "" },
    ];

    function handlePageChange(event, newPage) {
        setpage(newPage);
    }
    function handleRowChange(event) {
        setrowPerPage(event.target.value);
        setpage(0);
    }

    const StudentData = studentData.filter((e) => e.status === 1);
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
                            {status === "loading" ? (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <div className="w-100 text-center py-5">
                                            <CircularProgress />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : status === "failed" ? (
                                <div>
                                    <Alert severity="error">Error</Alert>
                                </div>
                            ) : CouresData.length === 0 ? (
                                <EmptyCoursesPage />
                            ) : (
                                CouresData.slice(
                                    page * rowPerPage,
                                    page * rowPerPage + rowPerPage
                                ).map((row) => {
                                    return (
                                        <TableRow key={row.id}>
                                            <TableCell
                                                style={{
                                                    padding: "22px 18px",
                                                    fontFamily: "Montserrat",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                {row.courseName}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    padding: "22px 18px",
                                                    fontFamily: "Montserrat",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                {row.description}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    padding: "22px 18px",
                                                    fontFamily: "Montserrat",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                {row.amount}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    padding: "22px 18px",
                                                    fontFamily: "Montserrat",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                {row.niveau}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    padding: "22px 18px",
                                                    fontFamily: "Montserrat",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                <button
                                                    onClick={() => {
                                                        setCourseSelected(row);
                                                        setHandleClose(true);
                                                    }}
                                                    className="course-reserve"
                                                >
                                                    Reserve
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
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
                    count={CouresData && CouresData.length}
                    component="div"
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowChange}
                ></TablePagination>
            </Paper>
            <ReserveCoursePopup
                handleClose={handleClose}
                setHandleClose={setHandleClose}
                students={StudentData}
                course={courseSelected}
                dispatch={dispatch}
            />
        </>
    );
}

export default ParentCouresList;
