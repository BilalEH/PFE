import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PAddMessages, PgetUserMessages } from '../../../api/parentsStore/parentStore';
import { Card } from '@mui/material';

function ParentMessages() {
    const [messageContent, setMessageContent] = useState('');
    const dispatch = useDispatch();
    const userdata = window.localStorage.getItem("User");
    const userId = JSON.parse(userdata).id;

    // Fetch user messages when the component mounts
    useEffect(() => {
        dispatch(PgetUserMessages(userId));
    }, [dispatch, userId]);

    // Get user messages from Redux store
    const userMessages = useSelector((state) => state.parents.messages);

    const handleMessageChange = (e) => {
        setMessageContent(e.target.value);
    };

    const handleSubmitMessage = () => {
        if (messageContent.trim() === '') {
            return;
        }

        const messageData = {
            user_id: userId,
            title: 'Message Title', // You may adjust this as needed
            content: messageContent,
        };

        dispatch(PAddMessages(messageData))
            .then(() => {
                // Optionally handle success, clear textarea, show success message, etc.
                setMessageContent('');
            })
            .catch((error) => {
                // Optionally handle error, show error message, etc.
                console.error('Error sending message:', error);
            });
    };

    return (
        <div>
            <textarea
                value={messageContent}
                onChange={handleMessageChange}
                placeholder="Type your message here..."
                rows={5}
                cols={50}
            />
            <br />
            <button onClick={handleSubmitMessage}>Send Message</button>

            {/* Display user messages */}
            <div>
                {userMessages.map((message) => (
                    <Card key={message.id}>
                        <p>: {message.user_id.firstName}</p>
                        <p>Content: {message.content}</p>
                    </Card>
                ))}
                <br />
            </div>
        </div>
    );
}

export default ParentMessages;
