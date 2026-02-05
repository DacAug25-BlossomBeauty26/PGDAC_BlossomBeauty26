// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import "../App.css";

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const userInfo = useSelector((state) => state.user?.userInfo);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!userInfo?.userId) return;

//     axios
//       .get(
//         `http://localhost:8083/orders/user/getallordersbyuserid/${userInfo.userId}`
//       )
//       .then((res) => {
//         setOrders(res.data || []);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching orders:", err);
//         setLoading(false);
//       });
//   }, [userInfo]);

//   if (!userInfo) {
//     return <p className="text-center mt-5">Please login to view orders</p>;
//   }

//   if (loading) {
//     return <p className="text-center mt-5">Loading orders...</p>;
//   }

//   return (
//     <div className="page-bg">
//       <div className="container my-5">
//         <h3 className="teal-heading text-center mb-4">📦 My Orders</h3>

//         {orders.length === 0 ? (
//           <p className="text-center">No orders found</p>
//         ) : (
//           orders.map((order) => (
//             <div
//               key={order.orderId}
//               className="card mb-4 shadow-sm"
//               style={{ borderRadius: "12px" }}
//             >
//               <div className="card-body">
//                 {/* ORDER HEADER */}
//                 <div className="d-flex justify-content-between align-items-center mb-2">
//                   <h5 className="mb-0">Order ID: {order.orderId}</h5>
//                   <span className="badge bg-info text-dark">
//                     {order.orderStatus}
//                   </span>
//                 </div>

//                 <p className="mb-2">
//                   <strong>Payment:</strong> {order.paymentMethod}
//                 </p>

//                 {/* ITEMS */}
//                 {order.orderItems.map((item) => (
//                   <div
//                     key={item.orderItemId}
//                     className="d-flex justify-content-between border-bottom py-1"
//                   >
//                     <span>
//                       {item.productName} × {item.quantity}
//                     </span>
//                     <strong>₹{item.subtotal}</strong>
//                   </div>
//                 ))}

//                 {/* FOOTER */}
//                 <div className="d-flex justify-content-between align-items-center mt-3">
//                   <h6 className="mb-0">
//                     Total: ₹{order.finalAmount}
//                   </h6>

//                   <button
//                     className="btn btn-outline-dark btn-sm"
//                     onClick={() =>
//                       navigate("/invoice", { state: order })
//                     }
//                   >
//                     View Invoice
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyOrders;


































import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { order_url } from "./restenpoints";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userInfo = useSelector((state) => state.user?.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?.userId) return;

    axios
      .get(
        `${order_url}/user/getallordersbyuserid/${userInfo.userId}`
      )
      .then((res) => {
        setOrders(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, [userInfo]);

  // order cancel
  const cancelOrder = async (orderId) => {
    try {
      await axios.put(
       `${order_url}/admin/updateorderbyid/${orderId}/status`,
        null,
        {
          params: { status: "CANCELLED" },
        }
      );

     
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId
            ? { ...order, orderStatus: "CANCELLED" }
            : order
        )
      );
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Unable to cancel order");
    }
  };

  if (!userInfo) {
    return <p className="text-center mt-5">Please login to view orders</p>;
  }

  if (loading) {
    return <p className="text-center mt-5">Loading orders...</p>;
  }

  return (
    <div className="page-bg">
      <div className="container my-5">
        <h3 className="teal-heading text-center mb-4">📦 My Orders</h3>

        {orders.length === 0 ? (
          <p className="text-center">No orders found</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.orderId}
              className="card mb-4 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body">
                {/* ORDER HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="mb-0">Order ID: {order.orderId}</h5>
                  <span className="badge bg-info text-dark">
                    {order.orderStatus}
                  </span>
                </div>

                <p className="mb-2">
                  <strong>Payment:</strong> {order.paymentMethod}
                </p>

                {/* ITEMS */}
                {order.orderItems.map((item) => (
                  <div
                    key={item.orderItemId}
                    className="d-flex justify-content-between border-bottom py-1"
                  >
                    <span>
                      {item.productName} × {item.quantity}
                    </span>
                    <strong>₹{item.subtotal}</strong>
                  </div>
                ))}

                {/* FOOTER */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <h6 className="mb-0">
                    Total: ₹{order.finalAmount}
                  </h6>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-dark btn-sm"
                      onClick={() =>
                        navigate("/invoice", { state: order })
                      }
                    >
                      View Invoice
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      disabled={
                        order.orderStatus === "CANCELLED" ||
                        order.orderStatus === "DELIVERED" ||
                        order.orderStatus === "DISPATCHED"
                      }
                      onClick={() => cancelOrder(order.orderId)}
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
