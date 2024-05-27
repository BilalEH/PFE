import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import useAuthContext from "../api/auth";
import BrandLogo from "./BrandLogo";
import HeaderAvatar from "./avatar";

export default function Heading() {
    const navigate = useNavigate();
    const { importUser } = useAuthContext();
    return (
        <div>
            <div className="container-fluid w-100 m-0">
                <div className="bg-white navbar navbar-expand-lg shadow-lg mt-4 mx-auto">
                    <div
                        style={{ transform: "scale(.5)" }}
                        className=" navbar-brand display-1 fs-2"
                    >
                        <BrandLogo />
                    </div>
                    <div className="header-links h-100 d-flex align-items-center">
                        <Link to="/">Home</Link>
                        <Link to="/contact">Contact Us</Link>
                    </div>
                    <div className="d-flex">
                        {!importUser() ? (
                            <>
                                <div className="nav-item mx-2 login">
                                    <Button onClick={() => navigate("/login")}>
                                        Log In
                                    </Button>
                                </div>
                                <div className="nav-item mx-2 signup">
                                    <Button onClick={() => navigate("/signup")}>
                                        Sign Up
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <HeaderAvatar />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
