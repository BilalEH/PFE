import { useState } from "react";
import "./login.css";
import { Link, redirect } from 'react-router-dom';
import { axiosclient } from "../api/axios";
import axios from "axios";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login attempt");

    // You can access email and password here directly
    const axios= await axiosclient.post("/login",email,password)
    console.log("Email:", email);
    console.log("Password:", password);
    console.log(axios);
  }

  function switchSignUp(){
    redirect('/signup');
  }

  return (
    <div>
      <div className="shadow-lg rounded-4 loginform">
        <div className="brand-logo text-center my-3">
          <span className='display-3'>ABS</span> center
        </div>
        <form action="" className='mt-5'>
          <div className="my-3">
            <TextField id="email" label="Email" variant="outlined" className="w-100" onChange={(e) => setEmail(e.target.value)} />
            {/* <label htmlFor="email" className="form-label">Email</label>
            <input type="text" name="email" id="email" className="form-control"  /> */}
          </div>
          <div className="my-3">
            <TextField type="password" id="email" label="Password" variant="outlined" className="w-100" onChange={(e) => setPassword(e.target.value)} />
            {/* <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" id="password" className="form-control" onChange={(e) => setPassword(e.target.value)} /> */}
          </div>
          <div className="my-3">
            <div className="loginBtn my-4">
              <Button className='btn text-capitalize' onClick={handleSubmit}>
                Log In
              </Button>
              {/* <button className='btn' onClick={handleSubmit}>Log In</button> */}
            </div>
            <hr />
            <div className="toSignupBtn my-4">
              <Button variant="outlined" className='btn text-capitalize' onClick={switchSignUp}>
                Sign Up
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
