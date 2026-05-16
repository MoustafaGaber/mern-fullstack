import axios from "axios";

// إذا كان الموقع شغال أونلاين، نستخدم الرابط النسبي فوراً، وإلا نستخدم اللوكال للهوست
const BASE_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:5001/api"
  : "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;