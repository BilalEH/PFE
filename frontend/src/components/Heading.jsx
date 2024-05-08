import React from 'react'
import "./header.css"
import { Link } from 'react-router-dom'

export default function Heading() {
  return (
    <div>
      <div className="container-fluid w-100 m-0">
        <div className="bg-white navbar navbar-expand-lg shadow-lg mt-4 mx-auto">
            <div className="navbar-brand display-1 fs-2">
                ABS
            </div>
            <div className="d-flex">
                <div className="nav-item mx-2 login">
                    <Link to="/login">Login</Link>
                </div>
                <div className="nav-item mx-2 signup">
                    <Link to="/signup">Signup</Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
