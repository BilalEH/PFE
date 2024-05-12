import React, { useState } from 'react';
import "./style/signup.css";
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, InputLabel, MenuItem, TextField, Select } from '@mui/material';
import BrandLogo from '../components/BrandLogo';
import { axiosInstance } from "../api/axios";

export default function Signup() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!lastName || !firstName || !email || !role || !password) {
      setErrors({ emptyFields: "Please fill in all required fields" });
      return;
    }

    try {
      await axiosInstance.get('/sanctum/csrf-cookie');
      const response = await axiosInstance.post('/register', {
        firstName,
        lastName,
        email,
        role,
        date,
        password
      });

      setDate("");
      setPassword("");
      setEmail("");
      setFirstName("");
      setRole("");
      setLastName("");

      if (response.status === 204) {
        console.log("Registration successful");
        navigate("/login");
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
        <form action="" className='mt-5' onSubmit={handleSubmit}>
          <div className="my-3 row">
            <div className="col-12 col-md-6 my-2">
              <TextField id="lastName" label="Last Name" variant="outlined" className="w-100" value={lastName} onChange={(e) => setLastName(e.target.value)} error={!!errors.lastName} helperText={errors.lastName} />
            </div>
            <div className="col-12 col-md-6 my-2">
              <TextField id="firstName" label="First Name" variant="outlined" className="w-100" value={firstName} onChange={(e) => setFirstName(e.target.value)} error={!!errors.firstName} helperText={errors.firstName} />
            </div>
          </div>
          <div className="my-3">
            <TextField id="email" label="Email" variant="outlined" className="w-100" value={email} onChange={(e) => setEmail(e.target.value)} error={!!errors.email} helperText={errors.email} />
          </div>
          <div className="my-3">
            <FormControl fullWidth>
              <InputLabel id="role" className='w-100'>Role</InputLabel>
              <Select labelId="role" id="demo-simple-select" value={role} label="Role" onChange={(e) => setRole(e.target.value)} error={!!errors.role}>
                <MenuItem value={"parent"}>Parent</MenuItem>
                <MenuItem value={"student"}>Student</MenuItem>
              </Select>
            </FormControl>
            {errors.role && <p className="error-message">{errors.role}</p>}
          </div>

          {role === "student" && <div className="my-4">
            <TextField label="Date of Birth" type='date' value={date} onChange={(e) => setDate(e.target.value)} fullWidth error={!!errors.date} helperText={errors.date} />
          </div>}
          <div className="my-3">
            <TextField type="password" id="password" label="Password" variant="outlined" className="w-100" value={password} onChange={(e) => setPassword(e.target.value)} error={!!errors.password} helperText={errors.password} />
          </div>
          <div className="my-3">
            <div className="loginBtn my-4">
              <Button className='btn text-capitalize' type="submit">
                Sign Up
              </Button>
            </div>
            <hr />
            <div className="toSignupBtn my-4">
              <Button variant="outlined" className='btn text-capitalize' onClick={() => navigate("/login")}>
                Log In
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
