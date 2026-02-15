import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import UserManagement from "./UserManagement";
import ProductManagement from "./ProductManagement";
import OrderManagement from "./OrderManagement";
import DiscountManagement from "./DiscountManagement";

const AdminDashboard = () => {

  const [activeTab, setActiveTab] = useState("users");

  const renderComponent = () => {

    switch(activeTab){

      case "users":
        return <UserManagement />;

      case "products":
        return <ProductManagement />;

      case "orders":
        return <OrderManagement />;

      case "discounts":
        return <DiscountManagement />;

      default:
        return <UserManagement />;
    }
  };

  return (

    <div>

      <AdminNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="container mt-4">

        {renderComponent()}

      </div>

    </div>
  );
};

export default AdminDashboard;
