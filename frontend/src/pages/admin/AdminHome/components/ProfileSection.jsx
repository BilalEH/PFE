import React from "react";
import useAuthContext from "../../../../api/auth";
import { Avatar } from "@mui/material";

export default function ProfileSection() {
    const { importUser } = useAuthContext();

    const arrowRightIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-right"
            viewBox="0 0 16 16"
        >
            <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
            />
        </svg>
    );
    return (
        <>
            <div className="row h-100">
                <div className="col-4 home-profile-img d-flex align-items-center">
                    <Avatar
                        className="w-100 h-auto"
                        alt={`${importUser() && importUser().firstName} ${
                            importUser() && importUser().lastName
                        }`}
                        src={importUser() && importUser().avatar}
                    />
                </div>
                <div className="col-8 home-profile-info">
                    <div>
                        <div className="home-profile-role text-muted mb-2">
                            {importUser().role}
                        </div>
                        <div className="home-profile-name">
                            {importUser().firstName} {importUser().lastName}
                        </div>
                    </div>
                    <div className="home-profile-click">
                        <span className="home-profile-click-text">
                            Click to see full profile
                        </span>{" "}
                        {arrowRightIcon}
                    </div>
                </div>
            </div>
        </>
    );
}
