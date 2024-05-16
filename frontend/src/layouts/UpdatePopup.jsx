import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
function UpdatePopup({handleClose,setHandleClose,title,content,children}) {
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
                    <Button onClick={()=>setHandleClose(false)}>Disagree</Button>
                    {children}
                </DialogActions>
            </Dialog>
        </>
    );
}

export default UpdatePopup;