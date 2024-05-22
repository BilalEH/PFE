import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTeacherPopup from "./components/AddTeacherPopup";
import "./style/AdminTeacher.css";
import {
    GetTeachers,
    // deleteTeacher,
} from "../../../api/adminsStore/adminStore";
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
import DeleteTeacherPopup from "./components/DeleteTeacherPopup";
import UpdateTeacherPopup from "./components/UpdateTeacherPopup";
import EmptyTeacherPage from "./components/EmptyTeacherPage";

const AdminTeachers = () => {
    const [handleAddClose, setHandleAddClose] = useState(false);
    const [handleDeleteClose, setHandleDeleteClose] = useState(false);
    const [handleUpdateClose, setHandleUpdateClose] = useState(false);
    const [page, setpage] = useState(0);
    const [rowPerPage, setrowPerPage] = useState(5);
    const [teacherSelected, setTeacherSelected] = useState();

    const dispatch = useDispatch();
    const teachers = useSelector((state) => state.admins.teachers);
    const status = useSelector((state) => state.admins.status_teacher);

    const columns = [
        { id: "actions", name: "" },
        { id: "CIN", name: "CIN" },
        { id: "firstName", name: "First name" },
        { id: "lastName", name: "Last name" },
        { id: "email", name: "Email" },
        { id: "phone", name: "Phone" },
    ];

    useEffect(() => {
        dispatch(GetTeachers());
    }, [dispatch]);

    function handlePageChange(event, newPage) {
        setpage(newPage);
    }
    function handleRowChange(event) {
        setrowPerPage(event.target.value);
        setpage(0);
    }

    const delete_icone = (
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
    const update_icone = (
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
                <div className="page-title">Teachers</div>
                <div className="add-teacher-btn">
                    <button
                        className="d-flex align-items-center me-2"
                        onClick={() => setHandleAddClose(true)}
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
                    handleClose={handleAddClose}
                    setHandleClose={setHandleAddClose}
                    dispatch={dispatch}
                />
            </div>
            <div className="mt-4">
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
                                ) : teachers.length === 0 ? (
                                    <EmptyTeacherPage />
                                ) : (
                                    teachers
                                        .slice(
                                            page * rowPerPage,
                                            page * rowPerPage + rowPerPage
                                        )
                                        .map((row) => {
                                            return (
                                                <TableRow key={row.id}>
                                                    <TableCell
                                                        style={{
                                                            padding:
                                                                "22px 18px",
                                                            fontFamily:
                                                                "Montserrat",
                                                            fontSize: "16px",
                                                        }}
                                                    >
                                                        <button
                                                            className="delete"
                                                            onClick={() => {
                                                                setHandleDeleteClose(
                                                                    true
                                                                );
                                                                setTeacherSelected(
                                                                    row
                                                                );
                                                            }}
                                                        >
                                                            {delete_icone}
                                                        </button>
                                                        <button
                                                            className="update"
                                                            onClick={() => {
                                                                setHandleUpdateClose(
                                                                    true
                                                                );
                                                                setTeacherSelected(
                                                                    row
                                                                );
                                                            }}
                                                        >
                                                            {update_icone}
                                                        </button>
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            padding:
                                                                "22px 18px",
                                                            fontFamily:
                                                                "Montserrat",
                                                            fontSize: "16px",
                                                        }}
                                                    >
                                                        {row.user_id.cin}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            padding:
                                                                "22px 18px",
                                                            fontFamily:
                                                                "Montserrat",
                                                            fontSize: "16px",
                                                        }}
                                                    >
                                                        {row.user_id.firstName}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            padding:
                                                                "22px 18px",
                                                            fontFamily:
                                                                "Montserrat",
                                                            fontSize: "16px",
                                                        }}
                                                    >
                                                        {row.user_id.lastName}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            padding:
                                                                "22px 18px",
                                                            fontFamily:
                                                                "Montserrat",
                                                            fontSize: "16px",
                                                        }}
                                                    >
                                                        {row.user_id.email}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            padding:
                                                                "22px 18px",
                                                            fontFamily:
                                                                "Montserrat",
                                                            fontSize: "16px",
                                                        }}
                                                    >
                                                        {row.user_id.phone}
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
                        count={teachers && teachers.length}
                        component="div"
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowChange}
                    ></TablePagination>
                </Paper>

                <DeleteTeacherPopup
                    handleClose={handleDeleteClose}
                    setHandleClose={setHandleDeleteClose}
                    dispatch={dispatch}
                    teacher={teacherSelected}
                />
                <UpdateTeacherPopup
                    handleClose={handleUpdateClose}
                    setHandleClose={setHandleUpdateClose}
                    teacher={teacherSelected}
                />
            </div>
        </div>
    );
};

export default AdminTeachers;
