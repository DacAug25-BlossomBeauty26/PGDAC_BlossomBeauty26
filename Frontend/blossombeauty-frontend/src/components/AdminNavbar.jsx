import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = ({ activeTab, setActiveTab }) => {

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  return (

    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

      <div className="container-fluid">

        <span className="navbar-brand">
          Admin Dashboard
        </span>

        <div className="navbar-nav">

          <button
            className={`nav-link btn btn-link text-white ${activeTab==="users" && "fw-bold"}`}
            onClick={()=>setActiveTab("users")}
          >
            User Management
          </button>

          <button
            className={`nav-link btn btn-link text-white ${activeTab==="products" && "fw-bold"}`}
            onClick={()=>setActiveTab("products")}
          >
            Product Management
          </button>

          <button
            className={`nav-link btn btn-link text-white ${activeTab==="orders" && "fw-bold"}`}
            onClick={()=>setActiveTab("orders")}
          >
            Order Management
          </button>

          <button
            className={`nav-link btn btn-link text-white ${activeTab==="discounts" && "fw-bold"}`}
            onClick={()=>setActiveTab("discounts")}
          >
            Discount Management
          </button>

        </div>

        <button
          className="btn btn-danger ms-auto"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default AdminNavbar;
