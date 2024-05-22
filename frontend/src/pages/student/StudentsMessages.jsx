import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SAddMessage,SGetMessages } from '../../api/StudentStore/Student';
import { toast } from 'react-toastify';
import { StyleToast } from '../../layouts/Layout';

function StudentsMessages() {
    const [messageContent, setMessageContent] = useState('');
    const dispatch = useDispatch();
    const userdata = window.localStorage.getItem("User");
    const userId = JSON.parse(userdata).id;

    // Fetch student messages when the component mounts
    useEffect(() => {
        dispatch(SGetMessages(userId));
    }, [dispatch, userId]);

    // Get student messages from Redux store
    const studentMessages = useSelector((state) => state.students.messages);
    console.log(studentMessages);

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

        dispatch(SAddMessage(messageData))
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

            {/* Display student messages */}
            <div>
                {studentMessages.map((message) => (
                    <div key={message.id}>
                        <p>Title: {message.title}</p>
                        <p>Content: {message.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StudentsMessages;



