import React from "react";
import useAuthContext from "../../api/auth";
import "./style/ProfilePage.css";
import { Avatar } from "@mui/material";

export default function ProfilePage() {
    const { importUser } = useAuthContext();
    console.log(importUser());
    return (
        <>
            <div className="page-title">Profile</div>
            <div className="container p-5 d-flex align-items-center">
                <div className="profile-container row w-100">
                    <div className="col-12 col-md-4 avatar-container p-5">
                        <Avatar
                            className="w-100 h-auto"
                            alt={`${importUser() && importUser().firstName} ${
                                importUser() && importUser().lastName
                            }`}
                            src={importUser() && importUser().avatar}
                        />
                    </div>
                    <div className="col-12 col-md-8 p-5 d-flex flex-column justify-content-evenly">
                        <div className="profile-role text-muted">
                            {importUser().role}
                        </div>
                        <div className="profile-name">
                            {importUser().firstName} {importUser().lastName}
                        </div>
                        <div className="profile-cin mt-5">
                            <span className="fw-semibold">CIN : </span>{" "}
                            {importUser().cin}
                        </div>
                        <div className="profile-phone mt-3">
                            <span className="fw-semibold">Phone : </span>{" "}
                            {importUser().phone}
                        </div>
                        <div className="profile-email mt-3">
                            <span className="fw-semibold">Email : </span>{" "}
                            {importUser().email}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
