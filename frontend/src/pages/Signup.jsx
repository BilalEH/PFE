import React, { useState } from "react";
import "./style/signup.css";
import { useNavigate } from "react-router-dom";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    TextField,
    Select,
} from "@mui/material";
import BrandLogo from "../components/BrandLogo";
import { axiosInstance } from "../api/axios";
import useAuthContext from "../api/auth.jsx";

export default function Signup() {
    var currentDate = new Date();

    // Get the current date components
    var year = currentDate.getFullYear();
    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Add leading zero if necessary
    var day = ("0" + currentDate.getDate()).slice(-2); // Add leading zero if necessary

    const [cin, setCin] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [date, setDate] = useState(year + "-" + month + "-" + day);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorsObj = {};

        if (!cin) errorsObj.cin = "CIN is required";
        if (!lastName) errorsObj.lastName = "Last name is required";
        if (!firstName) errorsObj.firstName = "First name is required";
        if (!phone) errorsObj.phone = "Phone number is required";
        if (!email) errorsObj.email = "Email is required";
        if (!role) errorsObj.role = "Role is required";
        if (!password) errorsObj.password = "Password is required";

        if (role === "student") {
            const currentDate = new Date();
            const selectedDate = new Date(date);
            const differenceInYears =
                currentDate.getFullYear() - selectedDate.getFullYear();

            if (differenceInYears < 6 || differenceInYears > 80) {
                errorsObj.date =
                    "Date of birth should be between 6 and 80 years ago";
            }
        }

        if (Object.keys(errorsObj).length > 0) {
            setErrors(errorsObj);
            return;
        }

        try {
            await axiosInstance.get("/sanctum/csrf-cookie");
            const response = await axiosInstance.post("/register", {
                firstName,
                lastName,
                email,
                role,
                date,
                password,
            });

            setPassword("");
            setEmail("");
            setFirstName("");
            setRole("");
            setLastName("");

            if (response.status === 204) {
                console.log("Registration successful");

                navigate("/login");

                // message to saad "khas tal admin y accepter demande dyal inscription 3ad tqd dkhel lpage student/parent"
                // if (role === "parent") {
                //     navigate("/parent");
                // } else {
                //     navigate("/Student");
                // }
            } else {
                console.log("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("An error occurred during registration:", error);
            if (error.response) {
                console.log("Server error response:", error.response.data);
                setErrors(error.response.data.errors);
            } else {
                console.log("Error details:", error.message);
            }
        }
    };

    return (
        <div>
            <div className="shadow-lg rounded-4 signupForm">
                <BrandLogo />
                <form action="" className="mt-5" onSubmit={handleSubmit}>
                    <div className="my-3">
                        <TextField
                            label="CIN"
                            id="cin"
                            variant="outlined"
                            value={cin}
                            onChange={(e) => setCin(e.target.value)}
                            error={!!errors.cin}
                            helperText={errors.cin}
                            fullWidth
                        />
                    </div>
                    <div className="my-3 row">
                        <div className="col-12 col-md-6 my-2">
                            <TextField
                                id="lastName"
                                label="Last Name"
                                variant="outlined"
                                className="w-100"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                            />
                        </div>
                        <div className="col-12 col-md-6 my-2">
                            <TextField
                                id="firstName"
                                label="First Name"
                                variant="outlined"
                                className="w-100"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                            />
                        </div>
                    </div>
                    <div className="my-3">
                        <TextField
                            id="phone"
                            label="Phone Number"
                            variant="outlined"
                            error={!!errors.phone}
                            helperText={errors.phone}
                            fullWidth
                        />
                    </div>
                    <div className="my-3 mt-4">
                        <FormControl fullWidth>
                            <InputLabel id="role" className="w-100">
                                Role
                            </InputLabel>
                            <Select
                                labelId="role"
                                id="demo-simple-select"
                                value={role}
                                label="Role"
                                onChange={(e) => setRole(e.target.value)}
                                error={!!errors.role}
                            >
                                <MenuItem value={"parent"}>Parent</MenuItem>
                                <MenuItem value={"student"}>Student</MenuItem>
                            </Select>
                        </FormControl>
                        {errors.role && (
                            <p className="error-message">{errors.role}</p>
                        )}
                    </div>

                    {role === "student" && (
                        <div className="my-4">
                            <TextField
                                label="Date of birth"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                fullWidth
                                error={!!errors.date}
                                helperText={errors.date}
                            />
                        </div>
                    )}
                    <div className="my-3">
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            className="w-100"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </div>
                    <div className="my-3">
                        <TextField
                            type="password"
                            id="password"
                            label="Password"
                            variant="outlined"
                            className="w-100"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                    </div>
                    <div className="my-3">
                        <div className="loginBtn my-4">
                            <Button
                                className="btn text-capitalize"
                                type="submit"
                            >
                                Sign Up
                            </Button>
                        </div>
                        <hr />
                        <div className="toSignupBtn my-4">
                            <Button
                                variant="outlined"
                                className="btn text-capitalize"
                                onClick={() => navigate("/login")}
                            >
                                Log In
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
