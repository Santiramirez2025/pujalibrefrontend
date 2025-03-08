import { io } from "socket.io-client";

// Reemplaza con la URL de tu servidor WebSocket
const SOCKET_SERVER_URL = "https://tu-servidor.com"; 

const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"], // Asegura una conexión estable
  reconnection: true, // Permite reconexión en caso de fallos
  reconnectionAttempts: 5, // Intenta reconectar 5 veces
  autoConnect: false, // Solo conecta cuando sea necesario
});

export default socket;
