import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import dotenv from "dotenv";

dotenv.config();

const fallbackRateLimit = {
  async limit() {
    return {
      success: true,
      limit: 100,
      remaining: 100,
      reset: 0,
    };
  },
};

const createRateLimiter = () => {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return fallbackRateLimit;
  }

  try {
    const redis = new Redis({
      url,
      token,
    });

    return new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, "60 s"),
    });
  } catch (error) {
    console.warn("Upstash config invalid, using fallback rate limiter:", error.message || error);
    return fallbackRateLimit;
  }
};

const ratelimit = createRateLimiter();

export default {
  async limit(key) {
    try {
      return await ratelimit.limit(key);
    } catch (error) {
      console.warn("Upstash request failed, using fallback rate limiter:", error.message || error);
      return {
        success: true,
        limit: 100,
        remaining: 100,
        reset: 0,
      };
    }
  },
};