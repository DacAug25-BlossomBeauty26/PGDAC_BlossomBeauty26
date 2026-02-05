

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth_url } from "../components/restenpoints";

console.log("auth_url =", auth_url);


/* REGISTER */
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        auth_url + "/register",   //APIGATEWAY
        userData
      );
      return response.data; // expected userInfo
    } catch (err) {
      return rejectWithValue(err.response?.data || "Registration failed");
    }
  }
);

/* LOGIN */
export const loginUser = createAsyncThunk(
  "user/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        auth_url+"/login",
        loginData
      );
      return response.data; // expected userInfo
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);

/*================= SLICE =================*/
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    userInfo: null,
    error: null,
    isAdmin: false, //  admin flag
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isAdmin = false; //  reset admin on logout
    },
    setAdmin: (state, action) => {
      state.isAdmin = action.payload; //  set admin flag
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
        state.userInfo = action.payload; // automatically log in after registration
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

//  Export actions
export const { setUserInfo, logout, setAdmin } = userSlice.actions;

export default userSlice.reducer;

