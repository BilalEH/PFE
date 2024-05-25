import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "../../../api/axios";
import { GetStudents, GetTeachers } from "../../../api/adminsStore/adminStore";
import TeacherClassesShowStudents from "./components/TeacherClassesShowStudents";
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
import { Button } from "bootstrap";
import useAuthContext from "../../../api/auth";
import LoadingForTables from "../../../components/LoadingForTables";
import EmptyTable from "../../../components/EmptyTable";
import ErrorData from "../../../components/ErrorData";
import "./style/TeacherClasses.css";

function TeacherClasses() {
    const [classes, setClasses] = useState([]);
    const [selectedClassStudents, setSelectedClassStudents] = useState([]);
    const dispatch = useDispatch();
    const teachersReq = useSelector((state) => state.admins);
    const teachers = teachersReq.teachers;
    const status = teachersReq.status_teacher;

    const { importUser } = useAuthContext();
    const teacher = teachers.filter((e) => e.user_id.id === importUser().id)[0];

    const handlerdisplaystudents = async (idclass) => {
        try {
            const response = await axiosInstance.get(
                `/api/classe/get-students/${idclass}`
            );
            setSelectedClassStudents(response.data.students);
            console.log(
                `Students in class ${idclass}:`,
                response.data.students
            );
        } catch (error) {
            console.error("Error fetching students for class:", error);
        }
    };

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axiosInstance.get("/api/classes");
                setClasses(response.data);
                dispatch(GetStudents());
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };
        dispatch(GetTeachers());
        fetchClasses(); // Call the fetchClasses function when the component mounts
    }, [dispatch]); // Pass dispatch as a dependency to useEffect

    // for table
    const columns = [
        { id: "className", name: "Class Name" },
        { id: "courseName", name: "Course Name" },
        { id: "teacher", name: "Teacher" },
        { id: "action2", name: "" },
    ];

    // for pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // function for pagination
    function handlePageChange(event, newPage) {
        setCurrentPage(newPage);
    }

    function handleRowsPerPageChange(event) {
        setRowsPerPage(event.target.value);
        setCurrentPage(0);
    }

    const ListIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            fill="currentColor"
            className="bi bi-list-task"
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z"
            />
            <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z" />
            <path
                fillRule="evenodd"
                d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z"
            />
        </svg>
    );

    return (
        <div>
            <div className="page-title">Classes</div>

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
                            {status === "loading" ? (
                                <LoadingForTables />
                            ) : status === "failed" ? (
                                <ErrorData />
                            ) : !classes.classes ? (
                                <EmptyTable content={"Class"} />
                            ) : (
                                classes.classes &&
                                classes.classes
                                    .filter(
                                        (e) => e.teacher_id.id === teacher.id
                                    )
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
                                                    className="show-students-btn"
                                                    onClick={() =>
                                                        handlerdisplaystudents(
                                                            row.id
                                                        )
                                                    }
                                                >
                                                    Show Students
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
                    count={
                        classes.classes
                            ? classes.classes.filter(
                                  (e) => e.teacher_id.id === teacher.id
                              ).length
                            : 0
                    }
                    component="div"
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </Paper>

            {selectedClassStudents.length > 0 && (
                <TeacherClassesShowStudents students={selectedClassStudents} />
            )}
        </div>
    );
}

export default TeacherClasses;
