
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { cart_url } from "../components/restenpoints";


const initialState = {
  items: [],
  totalAmount: 0,
  finalAmount: 0,
  status: "idle",
  error: null,
};

//fetching cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${cart_url}/getcartbyid/${userId}`); //APIGATEWAY
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "Failed to fetch cart"
      );
    }
  }
);

//add tocart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, productName, price }, { dispatch }) => {
    await axios.post(`${cart_url}/add`, null, {
      params: { userId, productId, productName, price },
    });

    dispatch(fetchCart(userId));
  }
);

//quantity update
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ userId, productId, quantity }, { dispatch }) => {
    await axios.put(`${cart_url}/updatequantity`, null, {  //APIGATEWAY
      params: { userId, productId, quantity },
    });

    dispatch(fetchCart(userId));
  }
);

//item remove
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }, { dispatch }) => {
    await axios.delete(`${cart_url}/removecart`, {      //APIGATEWAY
      params: { userId, productId },
    });

    dispatch(fetchCart(userId));
  }
);

//coupon apply
export const applyDiscount = createAsyncThunk(
  "cart/applyDiscount",
  async ({ userId, couponCode }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${cart_url}/applycoupon`, null, {         //APIGATEWAY
        params: { userId, code: couponCode },
      });
      return res.data;
    } catch (error) {
      
      return rejectWithValue(
        error?.response?.data || "Invalid coupon"
      );
    }
  }
);

//slice
const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.finalAmount = 0;
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      //FETCH CART
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;

        // Case 1: CartDTO
        if (action.payload?.cartItems) {
          state.items = action.payload.cartItems;
          state.totalAmount = action.payload.totalAmount;
          state.finalAmount =
            action.payload.finalAmount ?? action.payload.totalAmount;
        }
        // Case 2: List<CartItem>
        else {
          state.items = action.payload || [];
          state.totalAmount = state.items.reduce(
            (sum, item) => sum + item.subtotal,
            0
          );
          state.finalAmount = state.totalAmount;
        }
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

     //APPLY COUPON
      .addCase(applyDiscount.fulfilled, (state, action) => {
        state.error = null;

        if (!action.payload) return;

        state.totalAmount =
          action.payload.totalAmount ?? state.totalAmount;

        state.finalAmount =
          action.payload.finalAmount ?? state.finalAmount;
      })

      .addCase(applyDiscount.rejected, (state, action) => {
        // backend error message
        state.error = action.payload;
      });
  },
});


export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
