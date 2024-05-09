import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "../api/axios";
import '../pages/style/login.css'
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import BrandLogo from "../components/BrandLogo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch CSRF token
      await axios.get('/sanctum/csrf-cookie');

      // Make login request
      const response = await axios.post('/login', { email, password });

      // Check response status
      if (response.status === 204) {
        // Redirect to /users page on successful login
        navigate("/users");
      } else {
        // Handle invalid login credentials
        console.log("Invalid login credentials");
      }
    } catch (error) {
      // Handle errors
      console.error("An error occurred:", error);
      // Assuming error.response.data.errors is the correct property to access error messages
      console.log(error.response.data.errors);
    }
  };

  return (
    <div>
      <div className="shadow-lg rounded-4 loginform">
        <BrandLogo/>
        <form action="" className='mt-5'>
          <div className="my-3">
            <TextField id="email" label="Email" variant="outlined" className="w-100" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="my-3">
            <TextField type="password" id="password" label="Password" variant="outlined" className="w-100" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="my-3">
            <div className="loginBtn my-4">
              <Button className='btn text-capitalize' onClick={handleSubmit}>
                Log In
              </Button>
            </div>
            <hr />
            <div className="toSignupBtn my-4">
              <Button variant="outlined" className='btn text-capitalize' onClick={() => navigate('/signup')}>Sign Up</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
