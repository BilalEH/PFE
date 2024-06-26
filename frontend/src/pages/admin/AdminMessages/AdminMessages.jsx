import "./style/AdminMessages.css";
import Message from "./components/Message";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetUserMessages } from "../../../api/adminsStore/adminStore";
import { CircularProgress } from "@mui/material";
import EmptyMessage from "./components/EmptyMessage";
import EmptyMessagesHandle from "./components/EmptyMessagesHandle";

export default function AdminMessages() {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetUserMessages());
    }, [dispatch]);

    const messagesData = useSelector((state) => state.admins);
    const sortedMessages = [...messagesData.messages].sort((a, b) => new Date(b.send_date) - new Date(a.send_date));
    
    const renderMessages = () => {
        if (messagesData.status_message === "succeeded") {
            if (sortedMessages.length === 0) {
                return <EmptyMessagesHandle />;
            }
            return sortedMessages.map((message) => {
                return (
                    <div className="msger" key={message.id}>
                        <button
                            onClick={() => setSelectedMessage(message)}
                            className={`${message.status === "in process"? "msger-process": message.status === "accepted"? "msger-accepted": message.status === "rejected"? "msger-rejected": ""} msger-button`}>
                            <div className="msger-name d-flex align-items-center justify-content-between text-capitalize">
                                <div>{message.user_id.firstName} {message.user_id.lastName}</div>
                                <span className="msger-role rounded-pill">{message.user_id.role}</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mt-2">
                                <div className="msg-title text-muted m-0">{message.title}</div>
                                <div className="msg-date" style={{fontSize:"15px"}}>{message.send_date}</div>
                            </div>
                        </button>
                    </div>
                );
            });
        }
        if (messagesData.status_message === "failed") {
            return (
                <div className="w-100 h-100 d-flex justify-content-center">
                    No messages available
                </div>
            );
        }
        return (
            <div className="w-100 d-flex justify-content-center h-100 align-items-center">
                <CircularProgress />
            </div>
        );
    };

    return (
        <>
            <div className="page-title">Messages</div>
            <div className="messages-container row">
                <div className="col-4 p-0 messagers-container">
                    {renderMessages()}
                </div>
                <div className="col-8 msg-container">
                    {selectedMessage && <Message message={selectedMessage} />}
                    {!selectedMessage && <EmptyMessage />}
                </div>
            </div>
        </>
    );
}
