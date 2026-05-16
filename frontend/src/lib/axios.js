import axios from "axios";

// فرض الرابط النسبي مباشرة لقطع الشك باليقين أونلاين
const BASE_URL = "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;