import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WISHLIST_URL } from "../components/restenpoints";

// Fetch wishlist for a user
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId) => {
    const res = await axios.get(`${WISHLIST_URL}/user/${userId}`);
    return res.data;
  }
);

// Add item to wishlist
export const addWishlistItem = createAsyncThunk(
  "wishlist/addWishlistItem",
  async ({ userId, productId }) => {
    const res = await axios.post(`${WISHLIST_URL}/add`, { userId, productId });
    return res.data;
  }
);

// Remove item from wishlist
export const removeWishlistItem = createAsyncThunk(
  "wishlist/removeWishlistItem",
  async ({ userId, productId }) => {
    const res = await axios.delete(`${WISHLIST_URL}/remove`, {
      params: { userId, productId },
    });
    return { ...res.data, productId };
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch wishlist
      .addCase(fetchWishlist.pending, (state) => { state.loading = true; })
      .addCase(fetchWishlist.fulfilled, (state, action) => { state.items = action.payload; state.loading = false; })
      .addCase(fetchWishlist.rejected, (state, action) => { state.error = action.error.message; state.loading = false; })

      // add item
      .addCase(addWishlistItem.fulfilled, (state, action) => { state.items.push(action.payload); })

      // remove item
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.productId !== action.payload.productId);
      });
  },
});

export default wishlistSlice.reducer;
