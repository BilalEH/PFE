import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

export default function DeleteStudentPopup() {
    return (
        <>
            <Dialog>
                <div className="popup-container">
                    <DialogTitle>
                        <div className="popup-title"></div>
                    </DialogTitle>
                    <DialogContent>
                        <div className="popup-content"></div>
                    </DialogContent>
                </div>
            </Dialog>
        </>
    );
}
