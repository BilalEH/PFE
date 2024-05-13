import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./style/adminLayout.css"
import { Avatar } from "@mui/material";
import useAuthContext from "../api/auth";


export default function AdminLayout() {
    const { importUser } = useAuthContext();
    return (
        <>
            <div className="row">
                <div className="dashboard pe-0">
                    <div className="dashElement p-3">
                        <Link to="/profile">
                            <div className="d-flex">
                                <div>
                                Profile
                            </div>
                            <div className="ms-auto">
                                <Avatar alt={`${importUser().firstName} ${importUser().lastName}`} src={importUser().avatar} />
                            </div>
                            </div>
                        </Link>
                    </div>
                    <div className="dashElement p-3">
                        Saad dirassa
                    </div>
                </div>
            </div>
            <main className="adminPages">
                <Outlet></Outlet>
            </main>
        </>
    );
}
