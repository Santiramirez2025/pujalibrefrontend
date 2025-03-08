import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateAuctionBid } from "../Store/slices/auctionSlice";
import socket from "../Utils/WebSockets/socket";

export default function useBids(auctionIds) {
  const dispatch = useDispatch();
  const isSubscribed = useRef(false);

  useEffect(() => {
    if (!isSubscribed.current) {
      isSubscribed.current = true;

      socket.on("bidUpdated", (updatedAuction) => {
        if (updatedAuction && auctionIds.includes(updatedAuction.id)) {
          dispatch(updateAuctionBid(updatedAuction));
        }
      });
    }

    return () => {
      socket.off("bidUpdated");
      isSubscribed.current = false;
    };
  }, [auctionIds, dispatch]);
}
