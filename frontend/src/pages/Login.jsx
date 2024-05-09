import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from "../api/axios";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=   useNavigate();
  const  handleSubmit =async(e)  => {
     e.preventDefault();

   try{
    await axios.get('/sanctum/csrf-cookie')

    axios.post('/login', {
        email: email,
        password: password,
    })
    navigate("/users")

}
     catch(e){


        console.log(e)



     }



  }

  return (
    <div>
      <div className="shadow-lg rounded-4 loginform">
        <div className="brand-logo text-center my-3">
          <span className='display-3'>ABS</span> center
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
