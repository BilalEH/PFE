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
      // Fetch CSRF token before login request
      await axios.get('/sanctum/csrf-cookie');

      // Send login request
      const response = await axios.post('/login', { email, password });

      if (response.status === 204) {
        navigate("/users");
      } else {
        console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      if (error.response) {
        console.log("Server error response:", error.response.data);
      } else {
        // Request was not sent or something else went wrong
        console.log("Error details:", error.message);
      }
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
