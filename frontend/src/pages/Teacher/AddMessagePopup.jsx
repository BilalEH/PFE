import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { AddMessage } from "../../api/TeacherStore/TeacherStore";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { StyleToast } from "../../layouts/Layout";
import { toast } from "react-toastify";
import useAuthContext from "../../api/auth";

function AddMessagePopup({setOpen,open}) 
{
    const [messageContent, setMessageContent] = useState('');
    const [messageTitle, setMessageTitle] = useState('');
    const { importUser } = useAuthContext();
    const dispatch = useDispatch();
    const handleMessageChange = (e) => {
        setMessageContent(e.target.value);
    };

    const handleTitleChange = (e) => {
        setMessageTitle(e.target.value);
    };

    const handleSubmitMessage = () => {
        if (messageTitle === '') {
            toast.error('Message title cannot be empty', StyleToast);
        } else if (messageContent === '') {
            toast.error('Message cannot be empty', StyleToast);
        } else {
            setOpen(false);
            dispatch(AddMessage({ user_id: importUser().id, title: messageTitle, content: messageContent }));
        }
    }

    return (
        <>
            <Dialog open={open} onClose={()=>setOpen(false)}>
                <DialogTitle>Add New Message</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={messageTitle}
                        onChange={handleTitleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Message"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={messageContent}
                        onChange={handleMessageChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpen(false)} color="primary" >Cancel</Button>
                    <Button onClick={handleSubmitMessage} color="primary" >Send</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddMessagePopup;