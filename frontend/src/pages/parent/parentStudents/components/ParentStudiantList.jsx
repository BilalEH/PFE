import {Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,TextField,Tooltip,} from "@mui/material";
import PopupStudiantCourses from "./PopupStudiantCourses";
import { useEffect, useState } from "react";
import StuCourseList from "./StuCourList";
import ParentEmptyStudentsPage from "./ParentEmptyStudentsPage";
import { useDispatch } from "react-redux";
import { PDeleteStudent } from "../../../../api/parentsStore/parentStore";
import ErrorData from "../../../../components/ErrorData";
import LoadingForTables from "../../../../components/LoadingForTables";
function P_StudentsList({ StudentsData, status }) {
    const [handleClose, sethandleClose] = useState(false);
    const [StudentSelected, setStudentSelected] = useState({ id: "", name: "" });
    const [page, setPage] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(5);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const openDeleteDialog = (id) => {
        setStudentSelected({ ...StudentSelected, id });
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
    };

    const confirmDelete = () => {
        dispatch(PDeleteStudent(StudentSelected.id));
        setDeleteDialogOpen(false);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowChange = (event) => {
        setRowPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const columns = [
        { id: "action", name: "" },
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

    return (
        <>
            <Paper
                style={{background: "none",border: "2px solid #afafaf",borderRadius: "12px",overflow: "hidden"}}sx={{ width: "100%" }}>
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
                            {status == 'failed' ? <ErrorData /> :
                                status == 'loading' ? <LoadingForTables /> :
                                StudentsData.length === 0 ? (<ParentEmptyStudentsPage />) : (
                                    StudentsData.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                                    .map((row, i) => (
                                                <TableRow key={i}>
                                                    <TableCell style={{ padding: "22px 18px", fontFamily: "Montserrat", fontSize: "16px", }}>
                                                        <Button variant="contained" color="error" onClick={() => openDeleteDialog(row.id)}>delete</Button>
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            padding: "22px 18px",
                                                            fontFamily: "Montserrat",
                                                            fontSize: "16px",
                                                        }}>
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
                                                    <TableCell className={row.status == 0 ? "text-danger" : 'text-success'} style={{ padding: "22px 18px", fontFamily: "Montserrat", fontSize: "16px", textTransform: "capitalize" }}>
                                                        {row.status == 1 ? "verifie" : "non verifie"}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            padding: "22px 18px",
                                                            fontFamily: "Montserrat",
                                                            fontSize: "16px",
                                                        }}
                                                    >
                                                        <Tooltip title={`List of courses the ${row.user_id.firstName} is taking`} arrow>
                                                            <Button disabled={row.status !== 1} style={row.status == 1 ? { backgroundColor: "#19647e", color: "white" } : {}} variant="contained" onClick={() => ShowStudCourns(row.id, `${row.user_id.firstName} ${row.user_id.lastName}`)}>courses</Button>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                    )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination style={{ paddingTop: "20px", paddingBottom: "10px" }} rowsPerPageOptions={[1, 5]} rowsPerPage={rowPerPage} page={page} count={StudentsData.length} component="div" onPageChange={handlePageChange} onRowsPerPageChange={handleRowChange}/>
            </Paper>
            <PopupStudiantCourses sethandleClose={sethandleClose} handleClose={handleClose} title={`List of courses taught to ${StudentSelected.name}`}>
                <StuCourseList id={StudentSelected.id} />
            </PopupStudiantCourses>

            <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this student?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="error" autoFocus variant="contained">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default P_StudentsList;