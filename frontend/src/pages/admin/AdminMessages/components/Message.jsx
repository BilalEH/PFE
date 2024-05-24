import { useEffect, useState } from "react";
import "../style/AdminMessages.css";
import { useDispatch } from "react-redux";
import {
    AdminAcceptMessage,
    AdminRejectMessage,
} from "../../../../api/adminsStore/adminStore";

export default function Message({ message }) {
    const [MessageData, setMessageData] = useState({ ...message });
    const dispatch = useDispatch();
    function handleRefuseMsg(id) {
        dispatch(AdminRejectMessage({ MesID: id }));
        setMessageData({ ...MessageData, status: "rejected" });
    }
    useEffect(() => {
        setMessageData(message);
    }, [message]);
    function handleAcceptMsg(id) {
        dispatch(AdminAcceptMessage({ MesID: id }));
        setMessageData({ ...MessageData, status: "accepted" });
    }

    return (
        <>
            <div className="h-100">
                <div
                    className={`${
                        MessageData.status === "in process"
                            ? "msg-process"
                            : MessageData.status === "accepted"
                            ? "msg-accepted"
                            : MessageData.status === "rejected"
                            ? "msg-rejected"
                            : ""
                    } d-inline rounded-pill`}
                >
                    {MessageData.status}
                </div>
                <div className="message-from text-muted">
                    From : {MessageData.user_id.firstName}{" "}
                    {MessageData.user_id.lastName}
                </div>
                <div className="message-title">{MessageData.title}</div>
                <div className="message">{MessageData.content}</div>
                <div className="message-btns d-flex align-items-center justify-content-evenly">
                    {MessageData.status === "in process" && (
                        <>
                            <button
                                onClick={() => handleRefuseMsg(MessageData.id)}
                                className="refuse-msg-btn"
                            >
                                Refuse
                            </button>
                            <button
                                onClick={() => handleAcceptMsg(MessageData.id)}
                                className="accept-msg-btn"
                            >
                                Accept
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
