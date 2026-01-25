import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/userSlice";

const LoginForm = ({ toggleForm }) => {
  const dispatch = useDispatch();

  // 🔹 Get user state from Redux
  const userState = useSelector((state) => state.user);
  const { loading, error, userInfo } = userState;

  // 🔹 DEBUG (you can remove later)
  console.log("USER STATE:", userState);

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
    dispatch(loginUser(formData));
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Success message */}
      {userInfo && (
        <p style={{ color: "green" }}>Logged in Successfully!</p>
      )}

      <p>
        Don't have an account?{" "}
        <button type="button" onClick={toggleForm}>
          Register
        </button>
      </p>
    </div>
  );
};

export default LoginForm;