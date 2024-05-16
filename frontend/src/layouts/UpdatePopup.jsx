import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
function UpdateDeletePopup({handleClose,setHandleClose,title,content,children}) {
    return (
        <>
            <Dialog open={handleClose} onClose={()=>setHandleClose(false)} >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {children}
                </DialogActions>
            </Dialog>
        </>
    );
}

export default UpdateDeletePopup;