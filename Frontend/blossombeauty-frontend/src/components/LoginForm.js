import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setAdmin } from "../store/userSlice"; 
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userInfo, isAdmin } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Admin Login
    if (formData.email === "admin@gmail.com" && formData.password === "Admin@123") {
      dispatch(setAdmin(true)); // admin flag in redux
      navigate("/admin");
      return;
    }

    // Normal user
    dispatch(loginUser(formData));
  };

  return (
    <>
      <h4 className="text-center text-teal mb-3">Login</h4>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
          />
        </div>

        <button
          type="submit"
          className="btn btn-teal-light w-100"
          style={{ backgroundColor: "#20c997", color: "white" }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Error Message */}
     {error && (
  <p className="text-danger text-center mt-3">
    {error?.status === 401
      ? "Invalid email or password"
      : "Login failed. Please try again."}
  </p>
)}


      {/* Success Message */}
      {userInfo && (
        <p className="text-success text-center mt-3">Logged in Successfully!</p>
      )}
    </>
  );
};

export default LoginForm;
