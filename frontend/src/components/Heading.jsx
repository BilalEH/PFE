import React from 'react'
import "./header.css"
import {  useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

export default function Heading() {


  const navigate = useNavigate();

  return (
    <div>
      <div className="container-fluid w-100 m-0">
        <div className="bg-white navbar navbar-expand-lg shadow-lg mt-4 mx-auto">
            <div className="navbar-brand display-1 fs-2">
                ABS
            </div>
            <div className="d-flex">
                <div className="nav-item mx-2 login">
                    <Button onClick={() => navigate("/login")}>Log In</Button>
                </div>
                <div className="nav-item mx-2 signup">
                    <Button onClick={() => navigate("/signup")}>Sign Up</Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
