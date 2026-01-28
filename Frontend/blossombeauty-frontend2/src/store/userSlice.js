import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ================= REGISTER ================= */
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        userData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Registration failed");
    }
  }
);

/* ================= LOGIN ================= */
export const loginUser = createAsyncThunk(
  "user/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        loginData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);

/* ================= SLICE ================= */
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    userInfo: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default userSlice.reducer;