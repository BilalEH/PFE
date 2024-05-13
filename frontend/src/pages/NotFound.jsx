import "./style/notFound.css";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="p404 text-center">404</div>
            <div className="p404Text text-center my-3">
                It appears that this page doesn't exist
            </div>
            <div className="text-center my-4 goback">
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>
        </div>
    );
}
