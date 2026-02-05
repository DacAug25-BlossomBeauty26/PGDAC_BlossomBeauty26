import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { WISHLIST_URL } from "../components/restenpoints";

// Fetch wishlist by user ID
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${WISHLIST_URL}/${userId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch wishlist");
    }
  }
);

// Add product to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (item, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${WISHLIST_URL}/add`, item);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add to wishlist");
    }
  }
);

// Remove product from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${WISHLIST_URL}/remove`, {
        params: { userId, productId }
      });
      return { productId, message: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to remove from wishlist");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items.push(action.meta.arg); // add local copy
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.productId !== action.payload.productId
        );
      });
  },
});

export default wishlistSlice.reducer;
