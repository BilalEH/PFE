import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import { addRequest } from "../../../../api/parentsStore/parentStore";
import { toast } from "react-toastify";
import { StyleToast } from "../../../../layouts/Layout";

export default function ReserveCoursePopup({handleClose,setHandleClose,students,course,dispatch}) {
    const [studentSelected, setStudentSelected] = useState("");

    const SandReq = () => {
        if (studentSelected !== "") {
            dispatch(addRequest({id: course.id,data: { student_id: studentSelected },}));
            setStudentSelected("");
            setHandleClose(false);
        } else {
            toast.error('select student to sand request',StyleToast)
        }
    };

    const cancelIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-x-circle"
            viewBox="0 0 16 16"
        >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
    );

    const reserveIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-file-earmark-break"
            viewBox="0 0 16 16"
        >
            <path d="M14 4.5V9h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v7H2V2a2 2 0 0 1 2-2h5.5zM13 12h1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2h1v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1zM.5 10a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1z" />
        </svg>
    );

    return (
        <div>
            <Dialog open={handleClose} onClose={() => setHandleClose(false)}>
                {course && (
                    <div className="popup-container">
                        <DialogTitle>
                            <div className="popup-title">Reserve course</div>
                        </DialogTitle>
                        <DialogContent>
                            <div className="popup-content">
                                <div className="popup-text my-4">
                                    Which student you want to reserve "<span className="popup-name">{course.courseName}</span>" for?
                                </div>
                                <div className="popup-select my-3">
                                    <select className="form-control" defaultValue={studentSelected} onChange={(e) =>     setStudentSelected(e.target.value) }>
                                        <option value={""}>students</option>
                                        {students.map((student) => (
                                            <option
                                                key={student.id} value={student.id}>
                                                {student.user_id.firstName}{" "}
                                                {student.user_id.lastName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="popup-reserve-btns pt-3">
                                    <button
                                        onClick={() => setHandleClose(false)}
                                        className="popup-cancel-btn d-flex align-items-center justify-content-center"
                                    >
                                        {cancelIcon}
                                        <p className="m-0 ms-2">Cancel</p>
                                    </button>
                                    <button
                                        className="popup-add-btn d-flex align-items-center justify-content-center"
                                        onClick={SandReq}
                                    >
                                        {reserveIcon}
                                        <p className="m-0 ms-2">Reserve</p>
                                    </button>
                                </div>
                            </div>
                        </DialogContent>
                    </div>
                )}
            </Dialog>
        </div>
    );
}
