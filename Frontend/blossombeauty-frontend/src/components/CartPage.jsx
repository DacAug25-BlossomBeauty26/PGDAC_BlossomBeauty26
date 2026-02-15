
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCart,
  removeFromCart,
  updateQuantity,
  applyDiscount,
} from "../store/cartSlice";
import axios from "axios";
import { cart_url } from "./restenpoints";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);
  const { items = [], totalAmount = 0, finalAmount = 0 } =
    useSelector((state) => state.cart || {});

  const [couponCode, setCouponCode] = useState("");
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [message, setMessage] = useState("");

 //fetching cart
  useEffect(() => {
    if (userInfo?.userId) {
      dispatch(fetchCart(userInfo.userId));
    }
  }, [userInfo, dispatch]);

 //fetching coupons
  useEffect(() => {
    axios
      .get(cart_url+"/getallcoupons")       //APIGATEWAY
      .then((res) => setAvailableCoupons(res.data))
      .catch((err) => console.error("Coupon fetch error", err));
  }, []);

  //Quantity update
  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;

    dispatch(
      updateQuantity({
        userId: userInfo.userId,
        productId,
        quantity,
      })
    );
  };

  //coupon apply
  const handleApplyCoupon = () => {
    if (!couponCode) return;

    dispatch(
      applyDiscount({
        userId: userInfo.userId,
        couponCode,
      })
    )
      .unwrap()
      .then((res) => {
        setMessage(`✅ Coupon applied! Final amount ₹${res.finalAmount}`);
      })
      
         .catch((err) => {
        const errorMessage =
       typeof err === "string"
      ? err
      : err?.message || "Invalid coupon";

  setMessage(`❌ ${errorMessage}`);
});


    setTimeout(() => setMessage(""), 4000);
  };

  //proceed to order confirm
  const handleProceed = () => {
    if (items.length === 0) {
      alert("Cart is empty");
      return;
    }

   
    navigate("/order-confirmation", {
      state: { items, totalAmount, finalAmount },
    });
  };

  return (
    <div className="container my-4" style={{ maxWidth: "900px" }}>
      <h4 className="mb-3">🛒 My Cart</h4>

      {message && (
        <div className="alert alert-info py-2 text-center small">
          {message}
        </div>
      )}

      {items.length === 0 ? (
        <p className="text-muted">Your cart is empty</p>
      ) : (
        <>
          {/*  CART ITEMS  */}
          {items.map((item) => (
            <div key={item.cartItemId} className="card mb-2">
              <div className="card-body d-flex justify-content-between">
                <div>
                  <div className="fw-semibold">{item.productName}</div>
                  <small>₹{item.price}</small>

                  <div className="d-flex align-items-center gap-2 mt-1">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity - 1)
                      }
                    >
                      −
                    </button>
                    <small>{item.quantity}</small>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-end">
                  <div className="fw-bold">₹{item.subtotal}</div>
                  <button
                    className="btn btn-sm btn-outline-danger mt-1"
                    onClick={() =>
                      dispatch(
                        removeFromCart({
                          userId: userInfo.userId,
                          productId: item.productId,
                        })
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/*COUPONS*/}
          <div className="card my-3">
            <div className="card-body">
              <h5>✅ Only one Coupon is Applicable At a Time</h5>
              <h6>Available Coupons</h6>
              <ul className="small">
                {availableCoupons.map((c) => (
                  <li key={c.code}>
                    <strong>{c.code}</strong> –{" "}
                    {c.discountType === "PERCENTAGE"
                      ? `${c.discountValue}%`
                      : `₹${c.discountValue}`}{" "}
                    (Min ₹{c.minCartValue})
                  </li>
                ))}
              </ul>

              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handleApplyCoupon}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* TOTAL */}
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <span>Total</span>
                <strong>₹{totalAmount}</strong>
              </div>
              <div className="d-flex justify-content-between fw-bold">
                <span>Final</span>
                <span>₹{finalAmount}</span>
              </div>

              <button
                className="btn btn-success w-100 mt-2"
                onClick={handleProceed}
              >
                Proceed
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;







