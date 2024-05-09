import React, { useState } from 'react';
import "./style/signup.css";
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, InputLabel, MenuItem, TextField, Select } from '@mui/material';
import BrandLogo from '../components/BrandLogo';

export default function Signup() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [role, setRole] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can handle form submission here, e.g., send data to server
    // Add your logic here to handle the form submission, such as making an API call
  }

  return (
    <div>
      <div className="shadow-lg rounded-4 signupForm">
        <BrandLogo />
        <form action="" className='mt-5' onSubmit={handleSubmit}>
          <div className="my-3 row">
            <div className="col-12 col-md-6 my-2">
              <TextField id="lastName" label="Nom" variant="outlined" className="w-100" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="col-12 col-md-6 my-2">
              <TextField id="firstName" label="Prenom" variant="outlined" className="w-100" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
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

          {role === "student" && <div className="my-4">
            <TextField label="Date de naissance" type='Date' value={date} onChange={(e) => setDate(e.target.value)} fullWidth />
          </div>}
          <div className="my-3">
            <TextField type="password" id="password" label="Password" variant="outlined" className="w-100" value={password} onChange={(e) => setPassword(e.target.value)} />
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
