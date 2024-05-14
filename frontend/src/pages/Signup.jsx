import { useEffect, useState } from "react";
import "./style/signup.css";
import { useNavigate } from "react-router-dom";
import {Button,FormControl,InputLabel,MenuItem,TextField,Select, CircularProgress,} from "@mui/material";
import BrandLogo from "../components/BrandLogo";
import useAuthContext from "../api/auth";
export default function Signup() {

    const {Register,importUser}=useAuthContext();
    const [loading, setLoading] = useState(false);
    const padZero = (num) => num.toString().padStart(2, '0');

    useEffect(() => {
        const userTest = importUser();
        if (userTest) {
            if (userTest.role === 'admin') {
                navigate('/admin');
            } else if (userTest.role === 'student') {
                navigate('/student');
            } else if (userTest.role === 'teacher') {
                navigate('/teacher');
            } else if (userTest.role === 'parent') {
                navigate('/parent');
            }
            }
    }, []);

    const [cin, setCin] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [date, setDate] = useState(`${new Date().getFullYear()}-${padZero(new Date().getMonth() + 1)}-${padZero(new Date().getDate())}`);//year + "-" + month + "-" + day
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const validateForm = (e) => {
        setLoading(true)
        e.preventDefault();
        const errorsObj = {};
        // Regex pattern for Moroccan phone number (05, 06, or 07 followed by 8 digits)
        const phoneRegex = /^(05|06|07)[0-9]{8}$/;
        if (!phoneRegex.test(phone)) {
            errorsObj.phone = "Invalid Moroccan phone number format";
        }
        if(role=='student'){
            const currentDate = new Date();
            const selectedDate = new Date(date);
            const differenceInYears =currentDate.getFullYear() - selectedDate.getFullYear();
            if (differenceInYears < 6 || differenceInYears > 80) {
                errorsObj.date ="Date of birth should be between 6 and 80 years ago";
            }
        }
        // Regex pattern for CIN (2 letters followed by 2 to 7 numbers)
        const cinRegex = /^[A-Za-z]{2}[0-9]{2,7}$/;
        if (!cinRegex.test(cin)) {
            errorsObj.cin = "Invalid CIN format";
        }
        if (!cin) errorsObj.cin = "CIN is required";
        if (!lastName) errorsObj.lastName = "Last name is required";
        if (!firstName) errorsObj.firstName = "First name is required";
        if (!phone) errorsObj.phone = "Phone number is required";
        if (!email) errorsObj.email = "Email is required";
        if (!role) errorsObj.role = "Role is required";
        if (!password) errorsObj.password = "Password is required";
        if(Object.keys(errorsObj).length > 0){
            setLoading(false)
            return setErrors(errorsObj);
        }else{
            return handleSubmit();
        }
}
    const handleSubmit = async () => {
        let Data={cin: cin,last_name: lastName,first_name: firstName,email: email,role: role,password: password,phone: phone}
        if (role === "student") {
            Data={...Data,dateN: date}
        }
        const req=await Register(Data);
        if(req){
            const user = importUser();
                if (user.role === 'student') {
                navigate('/student');
                } else if (user.role === 'parent') {
                navigate('/parent');
                }   
            }
        return setLoading(false);
    };

    return (
        <>
            <div className="shadow-lg rounded-4 signupForm">
                <BrandLogo />
                <form action="" className="mt-5" onSubmit={validateForm}>
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
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                                endIcon={loading && <CircularProgress size={20} color="inherit" />}
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
        </>
    );
}
