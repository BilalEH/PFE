import "./style/AdminMessages.css";
import Message from "./components/Message";
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GetUserMessages } from "../../../api/adminsStore/adminStore";
import { CircularProgress } from "@mui/material";
import EmptyMessage from "./components/EmptyMessage";

export default function AdminMessages() {
    const [messageSelected, setMessageSelected] = useState("none");

    const Dispatch = useDispatch();
    useEffect(() => {
        Dispatch(GetUserMessages());
    }, []);

    const MessagesData = useSelector((state) => state.admins);
    // console.log(MessagesData);

    return (
        <>
            <div>
                <div className="page-title">Messages</div>
                <div className="messages-container row">
                    <div className="col-4 p-0 messagers-container">
                        {
                            MessagesData.status==='succeeded'?(
                                MessagesData.messages.map(e=>{
                                    return(
                                        <div className="msger" key={e.id}>
                                            <div className="msger-name d-flex align-items-center justify-content-">
                                                <div>
                                                    {e.user_id.firstName}{" "}
                                                    {e.user_id.lastName}
                                                </div>
                                                <span className="msger-role rounded-pill">
                                                    {e.user_id.role}
                                                </span>
                                            </div>
                                            <div className="msg-title text-muted">
                                                {e.title}
                                            </div>
                                        </div>
                                    );
                            })
                        ) : MessagesData.status === "failed" ? (
                            <div className="w-100 h-100 d-flex justify-content-center">
                                No messages available
                            </div>
                        ) : (
                            <div className="w-100 d-flex justify-content-center h-100 align-items-center">
                                <CircularProgress />
                            </div>
                        )}
                    </div>
                    <div className="col-8 msg-container">
                        {messageSelected == "none" ? (
                            <EmptyMessage />
                        ) : (
                            <Message message={messageSelected} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
