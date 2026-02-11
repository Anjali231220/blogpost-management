import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [regData, setregData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    conPassword: "",
  });
  const [showPassword , setShowPassword]= useState(false);
   const navigate = useNavigate();
  const [errors, setError] = useState({});
  const handleChange = (e) => {
    setregData({
      ...regData,
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
      localStorage.setItem("blog_rdata", JSON.stringify(regData));
      toast.success("Register SuccessFully...");
      navigate("/login")
    } else {
      toast.error("Something Went Wrong..");
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!regData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (regData.name.length <= 3) {
      newErrors.name = "Minimum 3 character required.";
    }

    if (!regData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regData.email)) {
      newErrors.email = "Invalid Email format.";
    }

    if (!regData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(regData.phone)) {
      newErrors.phone = "Phone must be in 10 digit.";
    }

    if (!regData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (regData.password.length < 6) {
      newErrors.password = "Password 6 character required.";
    }

    if (!regData.conPassword.trim()) {
      newErrors.conPassword = "Confirm Password is required.";
    } else if (regData.conPassword.length < 6) {
      newErrors.conPassword = "Comfirm Password 6 character required.";
    } else if (regData.password !== regData.conPassword) {
      newErrors.conPassword = "Password and Confirm Password are not same";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div>
      <h1>Create Account</h1>
      <p>join us and start your journey</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your full Name"
            onChange={handleChange}
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>
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
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Enter Your Phone Number"
            onChange={handleChange}
          />
          {errors.phone && <span className="error-msg">{errors.phone}</span>}
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

        <div className="password-field">
          <label htmlFor="password">Confirm Password</label>

          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="conPassword"
              id="conPassword"
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

          {errors.conPassword && (
            <span className="error-msg">{errors.conPassword}</span>
          )}
        </div>
       
        <button type="submit">Register</button>
      </form>
      <p>Already have an Account? <Link to ="/login">Login here!</Link></p>
    </div>
  );
}

export default Register;
