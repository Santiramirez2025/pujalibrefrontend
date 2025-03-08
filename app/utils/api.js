import axios from "axios";
import Constants from "expo-constants";

const BASE_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.X.X:3000"; // Reemplaza con tu IP

// 🔹 Configuración de Axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Obtener todas las subastas activas
export const fetchAuctions = async () => {
  try {
    const response = await api.get("/auctions");
    return response.data;
  } catch (error) {
    console.error("❌ Error en fetchAuctions:", error.response?.data || error.message);
    return [];
  }
};

// 🔹 Realizar una oferta (puja)
export const placeBid = async (auctionId, amount, token) => {
  try {
    const response = await api.post(
      `/auctions/${auctionId}/bid`,
      { amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error en placeBid:", error.response?.data || error.message);
    return { error: error.response?.data || "Error desconocido" };
  }
};

// 🔹 Obtener el perfil del usuario
export const fetchUserProfile = async (token) => {
  try {
    const response = await api.get("/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error en fetchUserProfile:", error.response?.data || error.message);
    return null;
  }
};

// 🔹 Actualizar suscripción del usuario
export const updateSubscription = async (token, plan) => {
  try {
    const response = await api.post(
      "/user/subscription",
      { plan },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error en updateSubscription:", error.response?.data || error.message);
    return null;
  }
};

// 🔹 Verificar conexión con el backend
export const checkServerStatus = async () => {
  try {
    const response = await api.get("/");
    console.log("✅ Servidor en línea:", response.data);
    return true;
  } catch (error) {
    console.error("❌ Error al conectar con el servidor:", error.response?.data || error.message);
    return false;
  }
};

// Exportación del cliente Axios
export default api;
