
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

const InvoicePage = () => {
  const { state: order } = useLocation();
  const navigate = useNavigate();

  if (!order) {
    return <p className="text-center">Invalid Invoice</p>;
  }

  return (
    <div className="page-bg">
      <div className="card-container invoice-card">
        <h3 className="teal-heading">🎉 Thank You for Shopping!</h3>

        <p className="sub-text">
          Order ID: <strong>{order.orderId}</strong>
        </p>

        {order.orderItems.map((item) => (
          <div key={item.orderItemId} className="item-row">
            <span>
              {item.productName} × {item.quantity}
            </span>
            <strong>₹{item.subtotal}</strong>
          </div>
        ))}

        <div className="summary-box">
          <h5>Payment Summary</h5>
          <p>
            <strong>Total Amount To be Paid:</strong> ₹{order.finalAmount}
          </p>
          <p>
            <strong>Payment Mode:</strong> {order.paymentMethod}
          </p>
        </div>

        <button className="teal-btn" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;
