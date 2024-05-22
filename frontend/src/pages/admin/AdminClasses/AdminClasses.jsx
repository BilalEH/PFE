import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    GetTeachers,
    GetCourses,
    AdminGetClasses,
} from "../../../api/adminsStore/adminStore";
import AddClassPopup from "./components/AddClassPopup";
import "./style/AdminClasses.css";
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
import StudentsListPopup from "./components/StudentsListPopup";

function AdminClasses() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    // useState for popups
    const [handleAddClose, setHandleAddClose] = useState(false);
    const [handleStudentsClose, setHandleStudentsClose] = useState(false);

    const { teachers, courses, classes, status_classe } = useSelector(
        (state) => state.admins
    );

    // for table
    const columns = [
        { id: "actions", name: "" },
        { id: "className", name: "Class Name" },
        { id: "courseName", name: "Course Name" },
        { id: "teacher", name: "Teacher" },
        { id: "action2", name: "" },
    ];

    // for pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        dispatch(AdminGetClasses());
    }, [dispatch]);

    // function for pagination
    function handlePageChange(event, newPage) {
        setCurrentPage(newPage);
    }

    function handleRowsPerPageChange(event) {
        setRowsPerPage(event.target.value);
        setCurrentPage(0);
    }
    if (status_classe === "succeeded") {
        console.log(classes);
        // setShow(true);
    }

    // icons
    const deleteIcon = (
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
    );

    const updateIcon = (
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
        </svg>
    );

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <div className="page-title">Class</div>
                <button
                    className="add-btn"
                    onClick={() => setHandleAddClose(true)}
                >
                    Add class
                </button>
            </div>

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
                                {columns.map((column) => (
                                    <TableCell
                                        style={{
                                            padding: "22px 18px",
                                            fontWeight: "bold",
                                            fontFamily: "Montserrat",
                                            fontSize: "16px",
                                        }}
                                        key={column.id}
                                    >
                                        {column.name}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {status_classe === "loading" ? (
                                <div>
                                    <CircularProgress />
                                </div>
                            ) : status_classe === "loading" ? (
                                <div>Failed</div>
                            ) : classes.length === 0 ? (
                                <div>empty</div>
                            ) : (
                                classes
                                    .slice(
                                        currentPage * rowsPerPage,
                                        currentPage * rowsPerPage + rowsPerPage
                                    )
                                    .map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell
                                                style={{
                                                    padding: "22px 18px",
                                                    fontFamily: "Montserrat",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                <button
                                                    className="delete"
                                                    onClick={() => {}}
                                                >
                                                    {deleteIcon}
                                                </button>
                                                <button
                                                    className="update"
                                                    onClick={() => {}}
                                                >
                                                    {updateIcon}
                                                </button>
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    padding: "22px 18px",
                                                    fontFamily: "Montserrat",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                {row.className}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    padding: "22px 18px",
                                                    fontFamily: "Montserrat",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                {row.course_id.courseName}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    padding: "22px 18px",
                                                    fontFamily: "Montserrat",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                {
                                                    row.teacher_id.user_id
                                                        .firstName
                                                }{" "}
                                                {
                                                    row.teacher_id.user_id
                                                        .lastName
                                                }
                                            </TableCell>
                                            <TableCell>
                                                <button
                                                    onClick={() => {
                                                        setHandleStudentsClose(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    Show students
                                                </button>
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
                    rowsPerPage={rowsPerPage}
                    page={currentPage}
                    count={classes.length}
                    component="div"
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </Paper>

            <AddClassPopup
                handleClose={handleAddClose}
                setHandleClose={setHandleAddClose}
                teachers={teachers}
                courses={courses}
                dispatch={dispatch}
            />

            <StudentsListPopup
                handleClose={handleStudentsClose}
                setHandleClose={setHandleStudentsClose}
            />
        </div>
    );
}

export default AdminClasses;
