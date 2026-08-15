import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import articlesRoutes from "../src/routers/articlesRouters.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// 1. إعداد الـ CORS بشكل ديناميكي ومرن 100% لمشروع التخرج
app.use(
  cors({
    origin: true, // يقبل تلقائياً أي رابط يرسل الطلب سواء لوكال أو روابط فيرسيل المتغيرة
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

// 3. مسار احتياطي للـ API للتأكد من عمل الباك إيند أونلاين
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Server is running smoothly!" });
});

app.use(rateLimiter);

// 2. مسارات الـ API الأساسية
app.use("/api/articles", articlesRoutes);

// ملاحظة: تم إزالة شرط الـ production الخاص بـ express.static 
// لأن ملف vercel.json الخارجي هو المسؤول عن توجيه ملفات الـ dist للفرونت إيند.

// 4. تشغيل الاتصال بقاعدة البيانات والسيرفر
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
}).catch((err) => {
  console.error("Database connection failed:", err);
});

export default app; // تصدير التطبيق لـ Vercel