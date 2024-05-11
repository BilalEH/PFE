import { useEffect, useState } from "react";
import './style/login.css'
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import BrandLogo from "../components/BrandLogo";
import useAuthContext from "../api/auth.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "admin@gmail.com", password: "password" });
  const { login, importUser } = useAuthContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(null); // State to store login error

  useEffect(() => {
    const userTest = importUser();
    if (userTest) {
      if (userTest.role === 'admin') {
        navigate('/admin');
      } else if (userTest.role === 'student') {
        navigate('/student');
      } else if (userTest.role === 'teacher') {
        navigate('/teacher');
      } else if (userTest.role === 'parent') {
        navigate('/parent');
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoginError(null); 

    if (!formData.email || !formData.password) {
      setErrors({
        email: !formData.email ? "Email is required" : "",
        password: !formData.password ? "Password is required" : ""
      });
      return;
    }

    const loginTest = await login(formData);
    if (loginTest) {
      const user = importUser();
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'student') {
        navigate('/student');
      } else if (user.role === 'teacher') {
        navigate('/teacher');
      } else if (user.role === 'parent') {
        navigate('/parent');
      }
    } else {
      console.log('login failed');
      setLoginError("Invalid email or password");
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
            />
          </div>
          <div className="my-3">
            <TextField
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              className="w-100"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={!!errors.password}
              helperText={errors.password}
            />
          </div>
          {loginError && (
              <div className="alert alert-danger" role="alert">
                {loginError}
              </div>
            )}
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
