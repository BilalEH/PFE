import { useDispatch, useSelector } from "react-redux";
import { ParentStudentsList } from "../../../api/parentsStore/parentStore";
import { useEffect, useState } from "react";
import useAuthContext from "../../../api/auth";
import P_StudentsList from "./components/ParentStudiantList";
import {CircularProgress } from "@mui/material";
import PAddStudentPopup from "./components/PAddStudentPopup";
import "./style/ParentStudents.css";

export default function ParentStudents() {
    const dispatch = useDispatch();
    const { importUser } = useAuthContext();
    useEffect(() => {
        dispatch(ParentStudentsList(importUser().id));
    }, []);
    const [handleAddClose, setHandleAddClose] = useState(false);
    const StudentsData = useSelector((state) => state.parents);
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <div className="page-title">Students page</div>
                <div className="me-2">
                    <button className="add-student" onClick={() => setHandleAddClose(true)}>Add Student</button>
                </div>
            </div>
            {/* {StudentsData.status === "succeeded" ? ( */}
                <P_StudentsList StudentsData={StudentsData.students} status={StudentsData.status}/>
            {/* // ) : StudentsData.status === "failed" ? (
            //     <div className="w-100 d-flex justify-content-center">
            //         No students data available
            //     </div>
            // ) : (
            //     <div className="w-100 d-flex justify-content-center">
            //         <CircularProgress />
            //     </div>
            // )} */}
            <PAddStudentPopup
                handleClose={handleAddClose}
                setHandleClose={setHandleAddClose}
            ></PAddStudentPopup>
        </div>
    );
}
