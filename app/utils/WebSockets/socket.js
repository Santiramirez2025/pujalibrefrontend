import io from "socket.io-client";
import Constants from "expo-constants";

const BASE_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.X.X:3000"; // Reemplaza con tu IP

const socket = io(BASE_URL, {
  transports: ["websocket"],
});

export default socket;
