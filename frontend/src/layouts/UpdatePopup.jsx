import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import "./style/popup.css";
function UpdateDeletePopup({
    handleClose,
    setHandleClose,
    title,
    content,
    children,
}) {
    return (
        <>
            <Dialog open={handleClose} onClose={() => setHandleClose(false)}>
                <div className="popup-container">
                    <DialogTitle>
                        <div className="popup-title">{title}</div>
                    </DialogTitle>
                    <DialogContent>{children}</DialogContent>
                </div>
            </Dialog>
        </>
    );
}

export default UpdateDeletePopup;
