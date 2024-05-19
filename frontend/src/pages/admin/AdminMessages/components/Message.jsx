import React from "react";
import "../style/AdminMessages.css";

export default function Message({ message }) {
    function handleRefuseMsg(id) {
        console.log(id);
    }

    function handleAcceptMsg(id) {
        console.log(id);
    }

    return (
        <>
            <div className="h-100">
                <div className="message-from text-muted">
                    From : {message.user_id.firstName}{" "}
                    {message.user_id.lastName}
                </div>
                <div className="message-title">{message.title}</div>
                <div className="message">{message.content}</div>
                <div className="message-btns d-flex align-items-center justify-content-evenly">
                    <button
                        onClick={() => handleRefuseMsg(message.id)}
                        className="refuse-msg-btn"
                    >
                        Refuse
                    </button>
                    <button
                        onClick={() => handleAcceptMsg(message.id)}
                        className="accept-msg-btn"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </>
    );
}
