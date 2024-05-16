import { Dialog, DialogContent, DialogTitle } from '@mui/material';
function UpdateDeletePopup({handleClose,setHandleClose,title,content,children}) {
    return (
        <>
            <Dialog open={handleClose} onClose={()=>setHandleClose(false)} >
                <DialogTitle >
                    {title}
                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default UpdateDeletePopup;