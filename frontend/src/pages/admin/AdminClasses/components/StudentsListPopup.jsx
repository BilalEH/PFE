import { Dialog } from "@mui/material";
import React from "react";

export default function StudentsListPopup({
    handleClose,
    setHandleClose,
    course,
}) {
    return (
        <>
            <Dialog open={handleClose} onClose={() => setHandleClose(false)}>
                <div className="popup-container">students list</div>
            </Dialog>
        </>
    );
}
