import axios from "axios";

// 1. Instancia de Axios (Detalle de Infraestructura)
// Se define la URL base de la API externa.
const api = axios.create({
  baseURL: "https://dummyjson.com",
});

// 2. Interceptor de Solicitudes
// Inyecta el token automáticamente si existe en el navegador.
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;