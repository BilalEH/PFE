import { Alert, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetRequests } from "../../../api/adminsStore/adminStore";
import "../style/pages.css";
import RequestsList from "./Requests Pages/RequestsList";

export default function AdminRequests() {
    const [studentRows, setStudentRows] = useState([]);
    const dispatch = useDispatch();
    const [roleSelected, setRoleSelected] = useState("parents");
    const RequestsData = useSelector((state) => state.admins);

    useEffect(() => {
        dispatch(GetRequests());
    }, []);

    useEffect(() => {
        if (RequestsData.status_request === "succeeded") {
            if (roleSelected === "parents") {
                setStudentRows(RequestsData.requests.parents);
            } else {
                setStudentRows(RequestsData.requests.students);
            }
        }
    }, [RequestsData,roleSelected]);


    return (
        <>
            <div className="page-title">Requests list</div>
                    <select defaultValue={roleSelected} onChange={(e) => setRoleSelected(e.target.value)}>
                        <option value="parents">Parent</option>
                        <option value="students">student</option>
                    </select>
            {RequestsData.status_request === "succeeded" ? (<RequestsList studentRows={studentRows} />):RequestsData.status_request === "loading" ? (<div className="loading_error_container"><CircularProgress size={50}/></div>):studentRows.length===0&&(<div className="loading_error_container"><Alert severity="error">Error loading data.</Alert></div>)}
        </>
    );
}
