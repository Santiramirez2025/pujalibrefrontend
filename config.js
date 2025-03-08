export const API_URL = "http://host.docker.internal:3000"; // Para acceder al backend desde Expo

console.log("Conectando a:", API_URL);

fetch(`${API_URL}/api/subastas`)
  .then(response => response.json())
  .then(data => console.log("Subastas recibidas:", data))
  .catch(error => console.error("Error conectando:", error));
