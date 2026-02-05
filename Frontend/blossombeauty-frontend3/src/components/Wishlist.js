import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../store/wishlistSlice";

export default function Wishlist({ userId }) {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (userId) dispatch(fetchWishlist(userId));
  }, [userId, dispatch]);

  if (status === "loading") return <p>Loading wishlist...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>My Wishlist</h2>
      {items.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.productId}>
              {item.productName} - ₹{item.price}
              <button
                onClick={() =>
                  dispatch(removeFromWishlist({ userId, productId: item.productId }))
                }
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
