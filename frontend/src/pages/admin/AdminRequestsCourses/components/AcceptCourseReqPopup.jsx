import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useState } from "react";

export default function AcceptCourseReqPopup({
    handleClose,
    setHandleClose,
    request,
}) {
    const [classSelected, setClassSelected] = useState();

    const handleAssign = () => {
        // dir khdmtk hna bach t accepti

        setHandleClose(false);
    };

    // console.log(request);

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
    const assignIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-hand-index"
            viewBox="0 0 16 16"
        >
            <path d="M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 1 0 1 0V6.435l.106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 0 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.035a.5.5 0 0 1-.416-.223l-1.433-2.15a1.5 1.5 0 0 1-.243-.666l-.345-3.105a.5.5 0 0 1 .399-.546L5 8.11V9a.5.5 0 0 0 1 0V1.75A.75.75 0 0 1 6.75 1M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v5.34l-1.2.24a1.5 1.5 0 0 0-1.196 1.636l.345 3.106a2.5 2.5 0 0 0 .405 1.11l1.433 2.15A1.5 1.5 0 0 0 6.035 16h6.385a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5 5 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.6 2.6 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046zm2.094 2.025" />
        </svg>
    );
    return (
        <>
            {request && (
                <Dialog
                    open={handleClose}
                    onClose={() => setHandleClose(false)}
                >
                    <div className="popup-container">
                        <DialogTitle>
                            <div className="popup-title">Assign</div>
                        </DialogTitle>
                        <DialogContent>
                            <div className="popup-content">
                                <div className="popup-text pb-3">
                                    Which class would you assign student "
                                    <span className="popup-name">
                                        {request.studentName}
                                    </span>
                                    " to?
                                </div>
                                <div className="popup-form my-3">
                                    <select
                                        onChange={(e) => {
                                            setClassSelected(e.target.value);
                                        }}
                                        className="form-control shadow"
                                        name="classId"
                                        id=""
                                    >
                                        <option value="">Select Class</option>
                                    </select>
                                </div>
                                <div className="popup-assign-btns py-2">
                                    <button
                                        onClick={() => setHandleClose(false)}
                                        className="popup-cancel-btn d-flex align-items-center justify-content-center"
                                    >
                                        {cancelIcon}
                                        <p className="m-0 ms-2">Cancel</p>
                                    </button>
                                    <button
                                        onClick={() => handleAssign()}
                                        className="popup-add-btn d-flex align-items-center justify-content-center"
                                    >
                                        {assignIcon}
                                        <p className="m-0 ms-2">Assign</p>
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
