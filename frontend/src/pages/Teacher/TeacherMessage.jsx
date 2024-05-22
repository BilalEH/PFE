import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetMessages } from '../../api/TeacherStore/TeacherStore';
import AddMessagePopup from './AddMessagePopup';
import useAuthContext from '../../api/auth';
import { Avatar, Button, Card, CardContent, CardHeader, CircularProgress, Grid, IconButton, Typography} from '@mui/material';
import "./messagesTeacher.css";




function TeacherMessage() {
    const [open, setOpen] = useState(false);
    const { importUser } = useAuthContext();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetMessages({ userId: importUser().id }));
    }, [dispatch, importUser]);

    const studentMessages = useSelector((state) => state.teachers);

    const handleDeleteMessage = (messageId) => {
        dispatch(DeleteMessage({ messageId }))
            .then(() => {
                toast.success('Message deleted successfully');
            })
            .catch(() => {
                toast.error('Failed to delete message');
            });
    };

    return (
        <>
            <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>Add Message</Button>
            <div className="Tmessage-container">
                {studentMessages.status_message === "loading" ? (
                    <div className="loading"><CircularProgress /></div>
                ) : studentMessages.status_message !== "succeeded" ? (
                    <div><p>No messages found</p></div>
                ) : (
                    <Grid container spacing={3}>
                        {studentMessages.messages.map((message) => (
                            <Grid item xs={12} sm={6} md={4} key={message.id}>
                                <Card className="Tmessage">
                                    <CardHeader
                                        avatar={<Avatar src={message.user_id.avatar} />}
                                        title={`${message.user_id.lastName} ${message.user_id.firstName}`}
                                        subheader={`Sent on: ${message.send_date}`}
                                        action={
                                            <Button aria-label="delete" color='error' variant='outlined'  onClick={() => handleDeleteMessage(message.id)}>delete</Button>
                                        }
                                    />
                                    <CardContent>
                                        <Typography variant="h6" className="Tmessage-title">
                                            {message.title}
                                        </Typography>
                                        <Typography variant="body2" className="Tmessage-status">
                                            Status: {message.status}
                                        </Typography>
                                        <Typography variant="body1" className="Tmessage-content">
                                            {message.content}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </div>
            <AddMessagePopup setOpen={setOpen} open={open} />
        </>
    );
}

export default TeacherMessage;