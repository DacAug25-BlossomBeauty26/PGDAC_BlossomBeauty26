import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWishlist, removeWishlistItem } from "../store/wishlistSlice";
import axios from "axios";
import { prod_url } from "./restenpoints";

const Wishlist = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [products, setProducts] = useState([]);

  // Fetch all products
  useEffect(() => {
    axios
      .get(prod_url + "/getallactiveproducts")
      .then((res) => setProducts(res.data || []))
      .catch((err) => console.error("Products fetch error", err));
  }, []);

  // Fetch wishlist
  useEffect(() => {
    if (userInfo?.userId) {
      dispatch(fetchWishlist(userInfo.userId));
    }
  }, [userInfo, dispatch]);

  // Map wishlist productId to full product details
  const wishlistWithDetails = wishlistItems.map((item) => {
    const product = products.find((p) => p.productId === item.productId);
    return {
      ...item,
      productName: product?.productName,
      price: product?.price,
      imageUrl: product?.imageUrl,
    };
  });

  const handleRemove = (wishlistId, productId) => {
    dispatch(removeWishlistItem({ wishlistId, productId, userId: userInfo.userId }));
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">💖 My Wishlist</h2>
      {wishlistWithDetails.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="row">
          {wishlistWithDetails.map((item) => (
            <div key={item.wishlistId} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={item.imageUrl}
                  className="card-img-top"
                  alt={item.productName}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5>{item.productName}</h5>
                  <p>₹{item.price}</p>
                  <button
                    className="btn btn-sm btn-danger mt-auto"
                    onClick={() => handleRemove(item.wishlistId, item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
