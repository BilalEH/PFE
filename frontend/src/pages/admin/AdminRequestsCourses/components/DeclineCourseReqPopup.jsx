import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

export default function DeclineCourseReqPopup({handleClose,setHandleClose,request}) {
    const handleDecline = () => {
        // dir khdmt hna bach tmhi request
        console.log({courseId:request.courseId,studentId:request.studentId});
        setHandleClose(false);
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

    const deleteIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-trash"
            viewBox="0 0 16 16"
        >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
    );
    return (
        <>
            {request && (
                <Dialog
                    open={handleClose} onClose={() => setHandleClose(false)}>
                    <div className="popup-container w-100">
                        <DialogTitle>
                            <div className="popup-title">
                                Decline Enrollment
                            </div>
                        </DialogTitle>
                        <DialogContent>
                            <div className="popup-content">
                                <div className="popup-text my-4">
                                    Are you sure you want to decline{" "}
                                    <span className="popup-name">
                                        {request.studentName}
                                    </span>
                                    's enrollment?
                                </div>
                                <div className="popup-decline-btns pt-3">
                                    <button
                                        onClick={() => setHandleClose(false)}
                                        className="popup-cancel-btn d-flex align-items-center justify-content-center"
                                    >
                                        {cancelIcon}
                                        <p className="m-0 ms-2">Cancel</p>
                                    </button>
                                    <button
                                        onClick={handleDecline}
                                        className="popup-delete-btn d-flex align-items-center justify-content-center"
                                    >
                                        {deleteIcon}
                                        <p className="m-0 ms-2">Decline</p>
                                    </button>
                                </div>
                            </div>
                        </DialogContent>
                    </div>
                </Dialog>
            )}
        </>
    );
}
