// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../store/userSlice";

// const LoginForm = ({ toggleForm }) => {
//   const dispatch = useDispatch();
//   const { loading, error, userInfo } = useSelector((state) => state.user);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser(formData));
//   };

//   return (
//     <div style={{ background: "#ffe6f0", minHeight: "100vh", paddingTop: "50px" }}>
//       <div style={{ maxWidth: "400px", margin: "0 auto" }}>
//         <div style={{
//           background: "white",
//           borderRadius: "20px",
//           padding: "30px",
//           boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
//         }}>
//           <h3 style={{ textAlign: "center", color: "#d63384", marginBottom: "25px" }}>Login</h3>

//           <form onSubmit={handleSubmit}>
//             <div style={{ marginBottom: "15px" }}>
//               <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
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

//             <div style={{ marginBottom: "20px" }}>
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

//             <button
//               type="submit"
//               disabled={loading}
//               style={{
//                 width: "100%",
//                 padding: "12px",
//                 borderRadius: "25px",
//                 border: "none",
//                 background: "linear-gradient(to right, #ff85c0, #d63384)",
//                 color: "white",
//                 fontWeight: "bold",
//                 cursor: "pointer"
//               }}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           {error && <p style={{ color: "#d63384", marginTop: "15px", textAlign: "center" }}>{error}</p>}
//           {userInfo && <p style={{ color: "#28a745", marginTop: "15px", textAlign: "center" }}>Logged in Successfully!</p>}

//           <p style={{ textAlign: "center", marginTop: "20px" }}>
//             Don&apos;t have an account?{" "}
//             <button
//               onClick={toggleForm}
//               style={{ background: "none", border: "none", color: "#d63384", cursor: "pointer", fontWeight: "bold" }}
//             >
//               Register
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;















import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/userSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector((state) => state.user);

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
    <>
      <h4 className="text-center text-danger mb-4">Login</h4>

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

      {error && <p className="text-danger text-center mt-3">{error}</p>}
      {userInfo && (
        <p className="text-success text-center mt-3">
          Logged in Successfully!
        </p>
      )}
    </>
  );
};

export default LoginForm;