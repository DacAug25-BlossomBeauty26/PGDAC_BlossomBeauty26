import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/userSlice";
import axios from "axios";

const RegistrationForm = ({ toggleForm }) => {
  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    contact: "",
    cityId: "",
    areaId: "",
    roleId:""
  });

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/cities")
      .then(res => setCities(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (formData.cityId) {
      axios.get(`http://localhost:8080/api/areas/${formData.cityId}`)
        .then(res => setAreas(res.data))
        .catch(err => console.log(err));
    } else {
      setAreas([]);
    }
  }, [formData.cityId]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {["firstName","lastName","username","password","email","contact"].map((field) => (
          <div key={field}>
            <label>{field}</label>
            <input
              type={field==="password"?"password":"text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div>
          <label>City</label>
          <select name="cityId" value={formData.cityId} onChange={handleChange} required>
            <option value="">Select City</option>
            {cities.map(city => <option key={city.cityId} value={city.cityId}>{city.cityName}</option>)}
          </select>
        </div>

        <div>
          <label>Area</label>
          <select name="areaId" value={formData.areaId} onChange={handleChange} required>
            <option value="">Select Area</option>
            {areas.map(area => <option key={area.areaId} value={area.areaId}>{area.areaName}</option>)}
          </select>
        </div>

        <button type="submit" disabled={loading}>Register</button>
      </form>
     {error && <p style={{ color: "red" }}>{error.message || JSON.stringify(error)}</p>}
      {userInfo && <p style={{color:"green"}}>Registered Successfully!</p>}
      <p>Already have account? <button onClick={toggleForm}>Login</button></p>
    </div>
  );
};

export default RegistrationForm;
