import React from "react";

export default function EmptyMessage() {
    return (
        <>
            <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                <div className="e-msg-icon my-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="82"
                        height="82"
                        fill="currentColor"
                        className="bi bi-chat-left-text-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z" />
                    </svg>
                </div>
                <div className="e-msg-content w-75 text-muted text-center my-2">
                    This is where you see the messages sent from regular members
                </div>
            </div>
        </>
    );
}
