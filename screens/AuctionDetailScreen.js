import React from "react";
import { View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateAuctionBid } from "@store/slices/auctionSlice";
import { placeBid } from "@utils/api";
import socket from "@utils/socket";

const AuctionDetailScreen = ({ route }) => {
  const { auction } = route.params;
  const dispatch = useDispatch();
  const selectedAuction = useSelector((state) => state.auctions.selectedAuction);

  const handlePlaceBid = async () => {
    const newBidAmount = selectedAuction.currentPrice + 10;
    const result = await placeBid(auction.id, newBidAmount);

    if (result) {
      socket.emit("placeBid", { auctionId: auction.id, bidAmount: newBidAmount });
      dispatch(updateAuctionBid(result));
    }
  };

  return (
    <View>
      <Text>Subasta: {selectedAuction?.title || auction.title}</Text>
      <Text>Precio Actual: ${selectedAuction?.currentPrice || auction.currentPrice}</Text>
      <Button title="Pujar" onPress={handlePlaceBid} />
    </View>
  );
};

export default AuctionDetailScreen;
