import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { prod_url } from "../components/restenpoints";

// Fetch all active products (for users)
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(prod_url+"/getallactiveproducts");  //API GATEWAY
      return response.data; // array of products
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch products");
    }
  }
);

// admin fetch all products
export const fetchAllProductsAdmin = createAsyncThunk(
  "products/fetchAllAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(prod_url+"/admin/getallproducts"); //API GATEWAY
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch all products");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // USER fetch
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.filter(p => p.active); // only active
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADMIN fetch all
      .addCase(fetchAllProductsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProductsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // all products
      })
      .addCase(fetchAllProductsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
