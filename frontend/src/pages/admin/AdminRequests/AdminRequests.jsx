import {CircularProgress} from "@mui/material";
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
        if(RequestsData.status==='succeeded'){
            setStudentRows(RequestsData.requests.parents)
        }
    }, [RequestsData]);

    useEffect(
        ()=>{
            if(RequestsData.status==='succeeded'){
                if(roleSelected==='parents'){
                    setStudentRows(RequestsData.requests.parents)
                }else{
                    setStudentRows(RequestsData.requests.students)
                }
            }
        },[roleSelected,RequestsData]
    )
    return (
        <>
            <div className="page-title">Requests list</div>
    
            {RequestsData.status === "succeeded" ? (
                <>
                    <select defaultValue={roleSelected} onChange={(e)=>setRoleSelected(e.target.value)}>
                        <option value="parents">Parent</option>
                        <option value="students">student</option>
                    </select>
                    <RequestsList studentRows={studentRows} />
                </>
            ) : RequestsData.status === "loading" ? (<div style={{ width: "100%", height: "70vh" }}className="d-flex justify-content-center align-items-center"><CircularProgress /></div>
            ) : (
                <div>Error loading data</div>
            )}
        </>
    );
}
