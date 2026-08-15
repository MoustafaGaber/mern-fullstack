import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    if (req.path === "/api/health") return next();

    const key = req.ip || "anonymous";
    const { success } = await ratelimit.limit(key);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }

    return next();
  } catch (error) {
    console.warn("Rate limit unavailable, continuing without it:", error.message || error);
    return next();
  }
};

export default rateLimiter;