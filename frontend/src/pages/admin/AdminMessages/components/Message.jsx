import React, { useEffect } from "react";
import "../style/AdminMessages.css";
import { useDispatch } from "react-redux";
import { AdminAcceptMessage } from "../../../../api/adminsStore/adminStore";

export default function Message({ message }) {
    const dispatch = useDispatch();
    function handleRefuseMsg(id) {
        console.log(id);
    }
    useEffect(()=>{console.log(message)},[message])
    function handleAcceptMsg(id) {
        dispatch(AdminAcceptMessage({MesID:id}))
    }

    return (
        <>
            <div className="h-100">
                    {message.status}
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
