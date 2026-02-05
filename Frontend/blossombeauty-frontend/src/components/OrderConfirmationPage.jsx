

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearCart } from "../store/cartSlice"; 
import "../App.css";
import { auth_url, cart_url, order_url } from "./restenpoints";

const OrderConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);


  const [deliveryInfo, setDeliveryInfo] = useState({
    email: "",
    contact: "",
    
  });


  const items = state?.items || [];
  const totalAmount = state?.totalAmount;
  const finalAmount = state?.finalAmount;


  useEffect(() => {
    if (!userInfo?.userId) return;

    axios
      .get(`${auth_url}/getbyuserid/${userInfo.userId}`)
      .then((res) => {
        setDeliveryInfo({
          email: res.data.email || "",
          contact: res.data.contact || "",
         
        });
      })
      .catch((err) => {
        console.error("Error fetching delivery info:", err);
      });
  }, [userInfo]);
  
  if (!state) {
    return <p className="text-center">Invalid access</p>;
  }

  const handlePlaceOrder = async () => {
    const orderPayload = {
      userId: userInfo.userId,
      totalAmount,
      finalAmount,
      paymentMethod: "COD",
      orderItems: items,
    };

    try {
      const res = await axios.post(
        order_url+"/user/createorder",
        orderPayload
      );

      await axios.post(
        `${cart_url}/clearcart/${userInfo.userId}`
      );

      dispatch(clearCart());

      navigate("/invoice", { state: res.data });
    } catch {
      alert("Order failed. Please try again.");
    }
  };

  return (
    <div className="page-bg">
      <div className="card-container">
        <h3 className="teal-heading">🧾 Order Confirmation</h3>

        {items.map((item) => (
          <div key={item.productId} className="item-row">
            <span>
              {item.productName} × {item.quantity}
            </span>
            <strong>₹{item.subtotal}</strong>
          </div>
        ))}

        {/* Contact Details */}
        <div className="summary-box">
          <p><strong>Contact Details</strong></p>
          <p>Email: {deliveryInfo.email}</p>
          <p>Contact: {deliveryInfo.contact}</p>
         
        </div>

        <div className="summary-box">
          <p><strong>Total:</strong> ₹{totalAmount}</p>
          <p><strong>Final Amount:</strong> ₹{finalAmount}</p>
          <p><strong>Payment:</strong> Cash on Delivery</p>
        </div>

        <button className="teal-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
