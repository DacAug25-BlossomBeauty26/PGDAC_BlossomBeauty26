
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { order_url } from "../components/restenpoints";

// fetching orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`${order_url}/getallordersbyuserid/${userId}`);  //APIGATEWAY
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// for ADMIN dashboard fetching all orders
export const fetchAllOrdersAdmin = createAsyncThunk(
  "orders/fetchAllAdmin",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(order_url+"/admin/getallorders");    //APIGATEWAY
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch all orders");
    }
  }
);

//for ADMIN dashboard Update order status 
export const updateOrderStatusAdmin = createAsyncThunk(
  "orders/updateStatusAdmin",
  async ({ orderId, status }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${order_url}/admin/updateorderbyid/${orderId}/status?status=${status}`          //APIGATEWAY
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to update order status");
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // USER fetch
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ADMIN fetch all
      .addCase(fetchAllOrdersAdmin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllOrdersAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchAllOrdersAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ADMIN update status
      .addCase(updateOrderStatusAdmin.fulfilled, (state, action) => {
        const index = state.orders.findIndex(o => o.orderId === action.payload.orderId);
        if (index !== -1) state.orders[index] = action.payload;
      });
  },
});

export default orderSlice.reducer;
