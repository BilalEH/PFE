import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {axiosInstance} from "../api/axios";
import '../pages/style/login.css'
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import BrandLogo from "../components/BrandLogo";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.get("/sanctum/csrf-cookie");
      const response = await axiosInstance.post("/login", credentials);
      
      if (response.status === 204) {
        // const user=await axiosInstance.get("/api/user");
        // console.log(user.data);
        navigate("/users");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <div>
      <div className="shadow-lg rounded-4 loginform">
        <BrandLogo />
        <form action="" className="mt-5" onSubmit={handleSubmit}>
          <div className="my-3">
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              className="w-100"
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
          </div>
          <div className="my-3">
            <TextField
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              className="w-100"
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>
          <div className="my-3">
            <div className="loginBtn my-4">
              <Button type="submit" className="btn text-capitalize">
                Log In
              </Button>
            </div>
            <hr />
            <div className="toSignupBtn my-4">
              <Button variant="outlined" className="btn text-capitalize" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
