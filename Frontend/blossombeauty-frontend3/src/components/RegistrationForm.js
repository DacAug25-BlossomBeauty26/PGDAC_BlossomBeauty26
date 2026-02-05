
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, setUserInfo } from "../store/userSlice"; 
import axios from "axios";
import { auth_url } from "./restenpoints";
const initialFormState = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  email: "",
  contact: "",
  cityId: "",
  areaId: "",
  roleId: ""
};

function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
}

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector((state) => state.user);

  const [formData, formDispatch] = useReducer(formReducer, initialFormState);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    axios.get(auth_url+"/getcities")
      .then(res => setCities(res.data));
  }, []);

  useEffect(() => {
    if (formData.cityId) {
      axios.get(`${auth_url}/getbycityid/${formData.cityId}`)
        .then(res => setAreas(res.data));
    } else {
      setAreas([]);
    }
  }, [formData.cityId]);

  const handleChange = (e) => {
    formDispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
      .unwrap()
      .then((user) => {
        
        dispatch(setUserInfo(user));
      })
      .catch((err) => {
        console.error("Registration error:", err);
      });
  };

  return (
    <>
      <h4 className="text-center text-teal mb-3">Register</h4>

      <form onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="row">
          <div className="col-6 mb-2">
            <input
              className="form-control"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              pattern="^[A-Za-z]+$"
              title="First name should contain only letters"
            />
          </div>

          <div className="col-6 mb-2">
            <input
              className="form-control"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              pattern="^[A-Za-z]+$"
              title="Last name should contain only letters"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="row">
          <div className="col-6 mb-2">
            <input
              className="form-control"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength={4}
              title="Username must be at least 4 characters"
            />
          </div>

          <div className="col-6 mb-2">
            <input
              className="form-control"
              placeholder="Contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              pattern="^[0-9]{10}$"
              title="Contact number must be exactly 10 digits"
            />
          </div>
        </div>

        {/* Email */}
       <div className="mb-2">
  <input
    type="email"
    className="form-control"
    placeholder="Email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    required
    pattern="/^(?!\.)(?!.*\.\.)([a-zA-Z0-9._%+-]+)(?<!\.)@([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}$/"
    

   

    title="Please enter a valid email address"
  />
</div>


        {/* Password */}
        <div className="mb-2">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*@)[A-Za-z\d@]{8,}$"
            title="Password must be at least 8 characters, include uppercase, lowercase, a number, and can contain @ as special character"
          />
        </div>

        {/* Row 3 */}
        <div className="row">
          <div className="col-6 mb-3">
            <select
              className="form-select"
              name="cityId"
              value={formData.cityId}
              onChange={handleChange}
              required
            >
              <option value="">City</option>
              {cities.map(city => (
                <option key={city.cityId} value={city.cityId}>
                  {city.cityName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-6 mb-3">
            <select
              className="form-select"
              name="areaId"
              value={formData.areaId}
              onChange={handleChange}
              required
            >
              <option value="">Area</option>
              {areas.map(area => (
                <option key={area.areaId} value={area.areaId}>
                  {area.areaName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="btn w-100 rounded-pill"
          style={{ backgroundColor: "#20c997", color: "white" }}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {error && <p className="text-danger text-center mt-2">{error}</p>}
      {userInfo && (
        <p className="text-success text-center mt-2">
          Registered Successfully!
        </p>
      )}
    </>
  );
};

export default RegistrationForm;


