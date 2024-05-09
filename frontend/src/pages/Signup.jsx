import React from 'react'
import "./style/signup.css"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import BrandLogo from "../components/BrandLogo";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");


  const currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Add leading zero if necessary
  var day = ('0' + currentDate.getDate()).slice(-2); // Add leading zero if necessary
  const [date, setDate] = useState(year + "-" + month + "-" + day);


  const navigate = useNavigate();

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
      <div className="shadow-lg rounded-4 signupForm">
        <BrandLogo/>
        <form action="" className='mt-5'>
          <div className="my-3 row">
            <div className="col-12 col-md-6 my-2">
              <TextField id="lasnName" label="Nom" variant="outlined" className="w-100" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="col-12 col-md-6 my-2">
              <TextField id="firstName" label="Prenom" variant="outlined" className="w-100" onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="my-3">
            <FormControl fullWidth>
              <InputLabel id="role" className='w-100'>Type</InputLabel>
              <Select labelId="role" id="demo-simple-select" value={role} label="Age" onChange={(e) => setRole(e.target.value)} >
                <MenuItem value={"parent"}>Parent</MenuItem>
                <MenuItem value={"student"}>Etudiant</MenuItem>
              </Select>
            </FormControl>
          </div>

          {role=="student" && <div className="my-4">
            <TextField label="Date de naissance" type='Date' value={date} onChange={(e) => setDate(e.target.value)} fullWidth/>
          </div>}
          <div className="my-3">
            <TextField type="password" id="password" label="Password" variant="outlined" className="w-100" onChange={(e) => setPassword(e.target.value)} />
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
              <Button variant="outlined" className='btn text-capitalize' onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
