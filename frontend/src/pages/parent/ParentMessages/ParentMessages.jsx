import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PAddMessages } from '../../../api/parentsStore/parentStore';
import { json } from 'react-router-dom';

function ParentMessages() {
    const [messageContent, setMessageContent] = useState('');
    const dispatch = useDispatch();
    const userdata = window.localStorage.getItem("User")
    // console.log(userdata)

    const userId=JSON.parse(userdata).id
    // console.log(userId)

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
        </div>
    );
}

export default ParentMessages;
