import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, TextField, Button, Typography, Box, Container, CardContent, CircularProgress, Avatar, CardHeader, Chip, Drawer, Pagination, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { SAddMessage, SGetMessages } from '../../api/StudentStore/Student';
import useAuthContext from '../../api/auth';
import { StyleToast } from '../../layouts/Layout';

function StudentsMessages() {
    const [messageContent, setMessageContent] = useState('');
    const [messageTitle, setMessageTitle] = useState('');
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const messagesPerPage = 4;
    const dispatch = useDispatch();
    const { importUser } = useAuthContext();
    const user = importUser();

    useEffect(() => {
        dispatch(SGetMessages(user.id));
    }, [dispatch, user.id]);

    const studentMessages = useSelector((state) => state.students);
    const sortedMessages = [...studentMessages.messages].sort((a, b) => new Date(b.send_date) - new Date(a.send_date));
    // status
    const indexOfLastMessage = page * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentMessages = sortedMessages.slice(indexOfFirstMessage, indexOfLastMessage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleMessageChange = (e) => {
        setMessageContent(e.target.value);
    };

    const handleTitleChange = (e) => {
        setMessageTitle(e.target.value);
    };

    const handleSubmitMessage = () => {
        if (messageTitle.trim() === '' || messageContent.trim() === '') {
            toast.error("Both title and content are required.", StyleToast);
            return;
        }
        const messageData = {
            user_id: user.id,
            title: messageTitle,
            content: messageContent,
        };
        setOpen(false);
        setMessageTitle('');
        setMessageContent('');
        dispatch(SAddMessage(messageData))
    };

    const handleDeleteMessage = (messageId) => {
        console.log(messageId);
        // dispatch(SDeleteMessage(messageId))
    };
    const DeleteIcon=(<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16"><path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/></svg>)
    const SendIcon=(<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-send-plus-fill" viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/><path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5"/></svg>)
    return (
        <Container maxWidth="">
            <Typography variant="h4" component="h1" gutterBottom>
                Your Messages
            </Typography>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <Button variant="contained" style={{backgroundColor:"#4CAF50"}} onClick={()=>setOpen(true)} startIcon={SendIcon}>
                    Send a Message
                </Button>
                <Pagination count={Math.ceil(sortedMessages.length / messagesPerPage)} page={page} onChange={handlePageChange}/>
            </Box>

            {status === 'loading' ? (
                <Box mt={4} display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            ) : status === 'failed' ? (
                <Typography variant="body1" color="error" gutterBottom>
                    Error loading messages.
                </Typography>
            ) : studentMessages.length === 0 ? (
                <Typography variant="body1" component="p" gutterBottom>
                    No messages found.
                </Typography>
            ) : (
                <Box mt={4}>
                    {currentMessages.map((message) => (
                        <Card key={message.id} variant="outlined" className="shadow" style={{ margin: '10px 0', position: 'relative', borderRadius: '10px' }}>
                            <CardHeader
                                avatar={<Avatar src={user.avatar}></Avatar>}
                                title={user.firstName + ' ' + user.lastName}
                                // subheader={new Date(message.send_date).getFullYear() + '-' + (new Date(message.send_date).getMonth() + 1) + '-' + new Date(message.send_date).getDate()}
                                subheader={message.send_date}
                                action={
                                    <Box display="flex" alignItems="center">
                                        {message.status === "accepted" ? <Chip label="Accepted" color="success" /> :
                                        message.status === "rejected" ? <Chip label="Rejected" color="error" /> :
                                        <Chip label="In Process" color="warning" />}
                                    </Box>
                                }
                            />
                            <CardContent>
                                <Typography variant="h6" component="h3">
                                    {message.title}
                                </Typography>
                                <Typography variant="body2">
                                    {message.content}
                                </Typography>
                                <IconButton aria-label="Delete" variant='contained' style={{ position: 'absolute', bottom: '10px', right: '10px' }} onClick={() => handleDeleteMessage(message.id)} color='error'>{DeleteIcon}</IconButton>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}

            <Drawer anchor="right" open={open} onClose={()=>setOpen(false)}>
                <Box p={2} width="400px" role="presentation">
                    <Typography variant="h6" gutterBottom>Send a Message</Typography>
                    <TextField autoFocus margin="dense" label="Title" type="text" fullWidth value={messageTitle} onChange={handleTitleChange}
                    />
                    <TextField margin="dense" label="Message" type="text" fullWidth multiline rows={4} value={messageContent} onChange={handleMessageChange}/>
                    <Box mt={2} display="flex">
                        <Button onClick={()=>setOpen(false)} color="error" sx={{ mr: 2 }} variant="outlined">Cancel</Button>
                        <Button onClick={handleSubmitMessage} color="success" variant="contained">Send</Button>
                    </Box>
                </Box>
            </Drawer>
        </Container>
    );
}

export default StudentsMessages;
