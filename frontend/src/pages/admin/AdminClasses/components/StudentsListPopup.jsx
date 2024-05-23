import {
    AppBar,
    Button,
    Dialog,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    GetClassStudents,
    RemoveStudentInClass,
} from "../../../../api/adminsStore/adminStore";
import LoadingForTables from "../../../../components/LoadingForTables";
import ErrorData from "../../../../components/ErrorData";
import EmptyTable from "../../../../components/EmptyTable";

export default function StudentsListPopup({
    handleClose,
    setHandleClose,
    classSelected,
}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetClassStudents({ ClassId: classSelected.id }));
    }, [classSelected]);
    const { action_status, class_Students } = useSelector(
        (state) => state.admins
    );
    // for table
    const columns = [
        { id: "actions", name: "" },
        { id: "cin", name: "CIN" },
        { id: "fullName", name: "Full Name" },
        { id: "dateN", name: "Birth Date" },
        { id: "phone", name: "Phone Number" },
        { id: "parentName", name: "Parent" },
        { id: "ParentCIN", name: "Parent CIN" },
        { id: "ParentPhoneNumber", name: "Parent Phone Number" },
    ];

    const RemoveStudent = (id) => {
        dispatch(
            RemoveStudentInClass({
                ClassId: classSelected.id,
                studentId: { student_id: id },
            })
        );
    };

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
    const closeIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-x-circle"
            viewBox="0 0 16 16"
        >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
    );
    const RemoveIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-person-dash"
            viewBox="0 0 16 16"
        >
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
            <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
        </svg>
    );
    return (
        <>
            <Dialog
                fullScreen
                open={handleClose}
                onClose={() => setHandleClose(false)}
            >
                <AppBar
                    style={{ backgroundColor: "#19647e" }}
                    sx={{ position: "relative" }}
                >
                    <Toolbar>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            List of students in the{" "}
                            <span
                                style={{
                                    fontWeight: "600",
                                    textDecoration: "underline",
                                }}
                            >
                                {classSelected.className}
                            </span>{" "}
                            class
                        </Typography>
                        <Button
                            edge="start"
                            variant=""
                            color="error"
                            onClick={() => setHandleClose(false)}
                            aria-label="close"
                            className="text-white"
                        >
                            {closeIcon}
                        </Button>
                    </Toolbar>
                </AppBar>
                <div className="text-start popup-container w-100 h-100">
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
                                    {action_status === "loading" ? (
                                        <LoadingForTables />
                                    ) : action_status === "failed" ? (
                                        <ErrorData />
                                    ) : class_Students.length === 0 ? (
                                        <EmptyTable content={"students"} />
                                    ) : (
                                        class_Students
                                            .slice(
                                                currentPage * rowsPerPage,
                                                currentPage * rowsPerPage +
                                                    rowsPerPage
                                            )
                                            .map((row) => (
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
                                                        <Tooltip
                                                            placement="left"
                                                            title={`Expel ${row.user_id.firstName} ${row.user_id.lastName} from this ${classSelected.className}`}
                                                            arrow
                                                        >
                                                            <Button
                                                                variant="contained"
                                                                color="error"
                                                                className="update"
                                                                onClick={() => {
                                                                    RemoveStudent(
                                                                        row.id
                                                                    );
                                                                }}
                                                            >
                                                                {RemoveIcon}
                                                            </Button>
                                                        </Tooltip>
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
                                                        {row.user_id.cin
                                                            ? row.user_id.cin
                                                            : "N/A"}
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
                                                        {row.user_id.firstName}{" "}
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
                                                        {row.dateN}
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
                                                    <TableCell
                                                        style={{
                                                            padding:
                                                                "22px 18px",
                                                            fontFamily:
                                                                "Montserrat",
                                                            fontSize: "16px",
                                                        }}
                                                    >
                                                        {row.absparent_id
                                                            ? row.absparent_id
                                                                  .user_id
                                                                  .lastName +
                                                              " " +
                                                              row.absparent_id
                                                                  .user_id
                                                                  .firstName
                                                            : "N/A"}
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
                                                        {row.absparent_id
                                                            ? row.absparent_id
                                                                  .user_id.cin
                                                            : "N/A"}
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
                                                        {row.absparent_id
                                                            ? row.absparent_id
                                                                  .user_id.phone
                                                            : "N/A"}
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
                            count={class_Students.length}
                            component="div"
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                        />
                    </Paper>
                </div>
            </Dialog>
        </>
    );
}
