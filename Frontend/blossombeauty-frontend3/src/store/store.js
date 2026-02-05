import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import wishlistReducer from "./wishlistSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
     products: productReducer,
     cart: cartReducer,
     orders: orderReducer,
     wishlist: wishlistReducer,
     
  },
});
