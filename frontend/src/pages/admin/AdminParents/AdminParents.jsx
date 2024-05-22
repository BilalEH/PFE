import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetParents, deleteParent } from "../../../api/adminsStore/adminStore";
import {
    Alert,
    CircularProgress,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import UpdateDeletePopup from "../../../layouts/UpdatePopup";
import ConfDelete from "./ConfDelete";
import UpdateParent from "./updateParent";
import EmptyParentsPage from "./components/EmptyParentsPage";
// import "./style/pages.css"

export default function AdminParents() {
    const dispatch = useDispatch();
    const { parents, status_parent } = useSelector((state) => state.admins);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [parentToDelete, setParentToDelete] = useState(null);
    const [parentToUpdate, setParentToUpdate] = useState(null);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const columns = [
        { id: "actions", name: "" },
        { id: "cin", name: "CIN" },
        { id: "firstName", name: "First name" },
        { id: "lastName", name: "Last name" },
        { id: "email", name: "Email" },
        { id: "phone", name: "Phone" },
    ];

    function handlePageChange(event, newPage) {
        setCurrentPage(newPage);
    }

    function handleRowsPerPageChange(event) {
        setRowsPerPage(event.target.value);
        setCurrentPage(0);
    }

    useEffect(() => {
        dispatch(GetParents());
    }, [dispatch]);

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
        <div className="w-100 h-100">
            <div className="page-title">List of Parents</div>
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
                            {parentsData.status_parent === "loading" ? (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <div className="w-100 text-center py-5">
                                            <CircularProgress />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : parentsData.status_parent === "failed" ? (
                                <div>
                                    <Alert severity="error">Error</Alert>
                                </div>
                            ) : parentsData.parents.length === 0 ? (
                                <EmptyParentsPage />
                            ) : (
                                parentsData.parents
                                    .slice(
                                        currentPage * rowsPerPage,
                                        currentPage * rowsPerPage + rowsPerPage
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
                                                    <button
                                                        className="delete"
                                                        onClick={() => {
                                                            setParUpdate(row);
                                                            setParDelete(
                                                                parent.id
                                                            );
                                                            setDeletePop(true);
                                                        }}
                                                    >
                                                        {delete_icone}
                                                    </button>
                                                    <button
                                                        className="update"
                                                        onClick={() => {
                                                            setParUpdate(row);
                                                            setUpdatePop(true);
                                                        }}
                                                    >
                                                        {update_icone}
                                                    </button>
                                                </TableCell>
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
                    rowsPerPageOptions={[1, 5]}
                    rowsPerPage={rowPerPage}
                    page={page}
                    count={parentsData.parents.length}
                    component="div"
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowChange}
                ></TablePagination>
            </Paper>
            <UpdateDeletePopup
                handleClose={UpdatePop}
                setHandleClose={setUpdatePop}
                title={"Update Parent"}
            >
                <UpdateParent
                    handleUpdate={handleUpdate}
                    UpdatePop={setUpdatePop}
                    data={ParUpdate}
                />
            </UpdateDeletePopup>
            <UpdateDeletePopup
                handleClose={deletePop}
                setHandleClose={setDeletePop}
                title={"Deleting parent"}
            >
                <ConfDelete
                    handleDelete={handleDelete}
                    DeletePop={setDeletePop}
                    data={ParUpdate}
                />
            </UpdateDeletePopup>
        </div>
    );
}
