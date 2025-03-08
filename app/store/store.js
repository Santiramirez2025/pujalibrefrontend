import { configureStore } from "@reduxjs/toolkit";
import auctionReducer from "./slices/auctionSlice";

export const store = configureStore({
  reducer: {
    auctions: auctionReducer, // ← Asegúrate de que el key es "auctions"
  },
});

export default store;
