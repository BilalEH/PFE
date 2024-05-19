import "../style/AdminMessages.css";

export default function EmptyMessagesHandle() {
    return (
        <>
            <div className="w-100 h-100 e-msgs-container d-flex justify-content-center align-items-center flex-column">
                <div className="e-msgs-icon my-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="82"
                        height="82"
                        fill="currentColor"
                        className="bi bi-wind"
                        viewBox="0 0 16 16"
                    >
                        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
                    </svg>
                </div>
                <div className="e-msgs-content text-muted w-75 text-center my-2">
                    It seems there are no messages
                </div>
            </div>
        </>
    );
}
