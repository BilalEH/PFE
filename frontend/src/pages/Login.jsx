import { useState } from "react";
import "./style/login.css";
import { useNavigate } from 'react-router-dom';
import { axiosclient } from "../api/axios";
// import axios from "axios";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import BrandLogo from "../components/BrandLogo";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate();
  const  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login attempt");

    // You can access email and password here directly
    const axios= await axiosclient.post("/login",email,password)
    console.log("Email:", email);
    console.log("Password:", password);
    console.log(axios);
  }


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
              <Button variant="outlined" className='btn text-capitalize' onClick={()=>navigate('/signup')}>Sign Up</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
