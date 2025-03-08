import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedAuction: null,
  auctions: [],
};

const auctionSlice = createSlice({
  name: "auctions",
  initialState,
  reducers: {
    updateAuctionBid: (state, action) => {
      if (state.selectedAuction && state.selectedAuction.id === action.payload.id) {
        state.selectedAuction.currentPrice = action.payload.currentPrice;
      }
    },
  },
});

export const { updateAuctionBid } = auctionSlice.actions;
export default auctionSlice.reducer;
