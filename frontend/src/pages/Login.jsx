import { useState, useEffect } from "react";
import "./style/login.css";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress } from "@mui/material";
import BrandLogo from "../components/BrandLogo";
import useAuthContext from "../api/auth.jsx";
import { useNavigate } from "react-router-dom";
import { StyleToast } from "../layouts/Layout.jsx";
import { toast } from "react-toastify";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "admin@gmail.com",
        password: "password",
    });
    const { login, importUser } = useAuthContext();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userTest = importUser();
        if (userTest) {
            if (userTest.role === "admin") {
                navigate("/admin");
            } else if (userTest.role === "student") {
                navigate("/student");
            } else if (userTest.role === "teacher") {
                navigate("/teacher");
            } else if (userTest.role === "parent") {
                navigate("/parent");
            }
        }
    }, []);

    const validateForm = () => {
        const errors = {};
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            errors.email = "Invalid email format";
        }

        const passwordRegex = /^.{8,}$/;
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (!passwordRegex.test(formData.password)) {
            errors.password = "Password must be at least 8 characters";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (validateForm()) {
            const loginTest = await login(formData);
            if (loginTest) {
                const user = importUser();
                if (user.role === "admin") {
                    navigate("/admin");
                } else if (user.role === "student") {
                    navigate("/student");
                } else if (user.role === "teacher") {
                    navigate("/teacher");
                } else if (user.role === "parent") {
                    navigate("/parent");
                }
            } else {
                toast.error("Invalid email or password", StyleToast);
            }
        }
        return setLoading(false);
    };

    return (
        <div>
            <div
                className="shadow-lg rounded-4 loginform"
                data-aos="fade-up"
                data-aos-easing="ease-out"
                data-aos-duration="800"
            >
                <BrandLogo />
                <form action="" className="mt-5" onSubmit={handleSubmit}>
                    <div className="my-3">
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            className="w-100"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
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
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                    </div>
                    <div className="my-3">
                        <div className="loginBtn my-4">
                            <Button
                                type="submit"
                                endIcon={
                                    loading && (
                                        <CircularProgress
                                            size={20}
                                            color="inherit"
                                        />
                                    )
                                }
                                className="btn text-capitalize"
                            >
                                Log In
                            </Button>
                        </div>
                        <hr />
                        <div className="toSignupBtn my-4">
                            <Button
                                variant="outlined"
                                className="btn text-capitalize"
                                onClick={() => navigate("/signup")}
                            >
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
