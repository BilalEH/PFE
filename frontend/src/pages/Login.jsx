import React, { useState } from "react";
import "./login.css";
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("login attempt");

    // You can access email and password here directly
    console.log("Email:", email);
    console.log("Password:", password);
  }

  return (
    <div>
      <div className="shadow-lg rounded-4 loginform">
        <div className="brand-logo text-center my-3">
          <span className='display-3'>AB</span> center
        </div>
        <form action="" className='mt-5'>
          <div className="my-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="text" name="email" id="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="my-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" id="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="my-5">
            <div className="loginBtn my-4">
              <button className='btn' onClick={handleSubmit}>Log In</button>
            </div>
            <hr />
            <div className="toSignupBtn my-4">
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
