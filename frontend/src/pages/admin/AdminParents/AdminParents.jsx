import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetParents, deleteParent } from "../../../api/adminsStore/adminStore";
import { Alert, Button, CircularProgress } from "@mui/material";
import UpdateDeletePopup from "../../../layouts/UpdatePopup";
import ConfDelete from "../AdminTeachers/ConfDelete";
import UpdateParent from "../AdminTeachers/updateParent";
// import "./style/pages.css"

export default function AdminParents() {
    const dispatch = useDispatch();
    const parentsData = useSelector((state) => state.admins);
    const [deletePop, setDeletePop] = useState(false);
    const [UpdatePop, setUpdatePop] = useState(false);
    const [ParDelete, setParDelete] = useState(0);
    const [ParUpdate, setParUpdate] = useState({ nom: "test" });

    useEffect(() => {
        dispatch(GetParents());
    }, [dispatch]);

    const handleDelete = () => {
        dispatch(deleteParent(ParDelete));
        setDeletePop(false);
    };

    const handleUpdate = (DataForm) => {
        setUpdatePop(false);
        console.log(DataForm);
    };

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
            <div className="page-title">List of Parents</div>
            {parentsData.status === "loading" ? (
                <div className="w-100 text-center">
                    <CircularProgress />
                </div>
            ) : parentsData.status === "failed" ? (
                <div>
                    <Alert severity="error">Error</Alert>
                </div>
            ) : parentsData.parents.length === 0 ? (
                <div className="d-flex justify-content-center">
                    <Alert className="w-50" severity="warning">
                        pas des donnes
                    </Alert>
                </div>
            ) : (
                <table className="page-table">
                    <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            <th>CIN</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Add at</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parentsData.parents.map((parent) => (
                            <tr key={parent.id}>
                                {/* <td>{parent.id}</td> */}
                                <td>{parent.user_id.cin}</td>
                                <td>{parent.user_id.firstName}</td>
                                <td>{parent.user_id.lastName}</td>
                                <td>{parent.user_id.email}</td>
                                <td>{parent.user_id.phone}</td>
                                <td>
                                    {new Date(
                                        parent.created_at
                                    ).toLocaleDateString()}
                                </td>
                                <td className="icons-td">
                                    <button
                                        className="table-btn delete"
                                        onClick={() => {
                                            setDeletePop(true);
                                            setParDelete(parent.id);
                                        }}
                                    >
                                        {delete_icone}
                                    </button>
                                    <button
                                        className="table-btn update"
                                        onClick={() => {
                                            setParUpdate(parent);
                                            setUpdatePop(true);
                                        }}
                                    >
                                        {update_icone}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <UpdateDeletePopup
                handleClose={UpdatePop}
                setHandleClose={setUpdatePop}
                title={"update Parent info"}
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
                title={"are you sure ?"}
            >
                <ConfDelete
                    handleDelete={handleDelete}
                    DeletePop={setDeletePop}
                />
            </UpdateDeletePopup>
        </div>
    );
}
