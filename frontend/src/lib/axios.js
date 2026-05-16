import axios from "axios";

// في بيئة التطوير: http://localhost:5001/api
// في بيئة الإنتاج: استخدام متغير البيئة VITE_BACKEND_URL أو URL نسبي
const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5001/api" 
  : import.meta.env.VITE_BACKEND_URL || "/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // لإرسال cookies مع الطلبات
});

export default api;