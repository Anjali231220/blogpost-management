import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [logData, setlogData] = useState({
    email: "",
    password: ""
  });
   const [showPassword , setShowPassword]= useState(false);
  const navigate = useNavigate();
  const [errors, setError] = useState({});
  const handleChange = (e) => {
    setlogData({
      ...logData,
      [e.target.name]: e.target.value,
    });
    setError({
      ...errors,
      [e.target.name]: "",
    });
  };

   const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const saveData = JSON.parse(localStorage.getItem("blog_rdata"));
      if(
        saveData.email === logData.email &&
        saveData.password === logData.password
      )
      {
        localStorage.setItem("blog_lData", JSON.stringify(logData));
      toast.success("Login Successfully.......");
      navigate("/dashboard")
      
      }
      else{
       toast.error("Something went Wrong");
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!logData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(logData.email)) {
      newErrors.email = "Invalid Email format.";
    }

    if (!logData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (logData.password.length < 6) {
      newErrors.password = "Password 6 character required.";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div>
      <h1>Welcome </h1>
      <p>join us and start your journey</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email Address"
            onChange={handleChange}
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>
        
       <div className="password-field">
          <label htmlFor="password">Password</label>

          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="******"
              onChange={handleChange}
            />

            <span
              className="toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {errors.password && (
            <span className="error-msg">{errors.password}</span>
          )}
        </div>
        <button type="submit">Login</button>
      </form>
       <p>Don't have an Account? <Link to ="/register" >Regester here</Link></p>
    </div>
  );
}

export default Login;
