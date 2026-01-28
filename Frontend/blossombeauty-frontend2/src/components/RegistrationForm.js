// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../store/userSlice";
// import axios from "axios";

// const RegistrationForm = ({ toggleForm }) => {
//   const dispatch = useDispatch();
//   const { loading, error, userInfo } = useSelector((state) => state.user);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     password: "",
//     email: "",
//     contact: "",
//     cityId: "",
//     areaId: "",
//     roleId:""
//   });

//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8080/api/cities")
//       .then(res => setCities(res.data))
//       .catch(err => console.log(err));
//   }, []);

//   useEffect(() => {
//     if (formData.cityId) {
//       axios.get(`http://localhost:8080/api/areas/${formData.cityId}`)
//         .then(res => setAreas(res.data))
//         .catch(err => console.log(err));
//     } else {
//       setAreas([]);
//     }
//   }, [formData.cityId]);

//   const handleChange = (e) => {
//     setFormData({...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(registerUser(formData));
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         {["firstName","lastName","username","password","email","contact"].map((field) => (
//           <div key={field}>
//             <label>{field}</label>
//             <input
//               type={field==="password"?"password":"text"}
//               name={field}
//               value={formData[field]}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         ))}

//         <div>
//           <label>City</label>
//           <select name="cityId" value={formData.cityId} onChange={handleChange} required>
//             <option value="">Select City</option>
//             {cities.map(city => <option key={city.cityId} value={city.cityId}>{city.cityName}</option>)}
//           </select>
//         </div>

//         <div>
//           <label>Area</label>
//           <select name="areaId" value={formData.areaId} onChange={handleChange} required>
//             <option value="">Select Area</option>
//             {areas.map(area => <option key={area.areaId} value={area.areaId}>{area.areaName}</option>)}
//           </select>
//         </div>

//         <button type="submit" disabled={loading}>Register</button>
//       </form>
//      {error && <p style={{ color: "red" }}>{error.message || JSON.stringify(error)}</p>}
//       {userInfo && <p style={{color:"green"}}>Registered Successfully!</p>}
//       <p>Already have account? <button onClick={toggleForm}>Login</button></p>
//     </div>
//   );
// };

// export default RegistrationForm;





// import React, { useEffect, useReducer, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../store/userSlice";
// import axios from "axios";

// const initialFormState = {
//   firstName: "",
//   lastName: "",
//   username: "",
//   password: "",
//   email: "",
//   contact: "",
//   cityId: "",
//   areaId: "",
//   roleId: ""
// };

// function formReducer(state, action) {
//   switch (action.type) {
//     case "UPDATE_FIELD":
//       return { ...state, [action.field]: action.value };
//     case "RESET_FORM":
//       return initialFormState;
//     default:
//       return state;
//   }
// }

// const RegistrationForm = ({ toggleForm }) => {
//   const dispatch = useDispatch();
//   const { loading, error, userInfo } = useSelector((state) => state.user);

//   const [formData, formDispatch] = useReducer(formReducer, initialFormState);
//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/cities")
//       .then((res) => setCities(res.data))
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     if (formData.cityId) {
//       axios
//         .get(`http://localhost:8080/api/areas/${formData.cityId}`)
//         .then((res) => setAreas(res.data))
//         .catch((err) => console.log(err));
//     } else {
//       setAreas([]);
//     }
//   }, [formData.cityId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     formDispatch({ type: "UPDATE_FIELD", field: name, value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(registerUser(formData));
//   };

//   return (
//     <div style={{ background: "#ffe6f0", minHeight: "100vh", paddingTop: "50px" }}>
//       <div style={{ maxWidth: "500px", margin: "0 auto" }}>
//         <div style={{
//           background: "white",
//           borderRadius: "20px",
//           padding: "30px",
//           boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
//         }}>
//           <h3 style={{ textAlign: "center", color: "#d63384", marginBottom: "25px" }}>Register</h3>

//           <form onSubmit={handleSubmit}>
//             {["firstName", "lastName", "username", "email", "contact"].map((field) => (
//               <div style={{ marginBottom: "15px" }} key={field}>
//                 <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>{field}</label>
//                 <input
//                   type="text"
//                   name={field}
//                   value={formData[field]}
//                   onChange={handleChange}
//                   required
//                   style={{
//                     width: "100%",
//                     padding: "10px 15px",
//                     borderRadius: "10px",
//                     border: "1px solid #ffc0cb",
//                     outline: "none"
//                   }}
//                 />
//               </div>
//             ))}

//             <div style={{ marginBottom: "15px" }}>
//               <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 style={{
//                   width: "100%",
//                   padding: "10px 15px",
//                   borderRadius: "10px",
//                   border: "1px solid #ffc0cb",
//                   outline: "none"
//                 }}
//               />
//             </div>

//             <div style={{ marginBottom: "15px" }}>
//               <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>City</label>
//               <select
//                 name="cityId"
//                 value={formData.cityId}
//                 onChange={handleChange}
//                 required
//                 style={{
//                   width: "100%",
//                   padding: "10px 15px",
//                   borderRadius: "10px",
//                   border: "1px solid #ffc0cb",
//                   outline: "none"
//                 }}
//               >
//                 <option value="">Select City</option>
//                 {cities.map((city) => (
//                   <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
//                 ))}
//               </select>
//             </div>

//             <div style={{ marginBottom: "20px" }}>
//               <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Area</label>
//               <select
//                 name="areaId"
//                 value={formData.areaId}
//                 onChange={handleChange}
//                 required
//                 style={{
//                   width: "100%",
//                   padding: "10px 15px",
//                   borderRadius: "10px",
//                   border: "1px solid #ffc0cb",
//                   outline: "none"
//                 }}
//               >
//                 <option value="">Select Area</option>
//                 {areas.map((area) => (
//                   <option key={area.areaId} value={area.areaId}>{area.areaName}</option>
//                 ))}
//               </select>
//             </div>

//             <button type="submit" disabled={loading} style={{
//               width: "100%",
//               padding: "12px",
//               borderRadius: "25px",
//               border: "none",
//               background: "linear-gradient(to right, #ff85c0, #d63384)",
//               color: "white",
//               fontWeight: "bold",
//               cursor: "pointer"
//             }}>
//               {loading ? "Registering..." : "Register"}
//             </button>
//           </form>

//           {error && <p style={{ color: "#d63384", marginTop: "15px", textAlign: "center" }}>{error.message || error}</p>}
//           {userInfo && <p style={{ color: "#28a745", marginTop: "15px", textAlign: "center" }}>Registered Successfully!</p>}

//           <p style={{ textAlign: "center", marginTop: "20px" }}>
//             Already have an account?{" "}
//             <button
//               onClick={toggleForm}
//               style={{ background: "none", border: "none", color: "#d63384", cursor: "pointer", fontWeight: "bold" }}
//             >
//               Login
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;




import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/userSlice";
import axios from "axios";

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
    axios.get("http://localhost:8080/api/cities")
      .then(res => setCities(res.data));
  }, []);

  useEffect(() => {
    if (formData.cityId) {
      axios.get(`http://localhost:8080/api/areas/${formData.cityId}`)
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
    dispatch(registerUser(formData));
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