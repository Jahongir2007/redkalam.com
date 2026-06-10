import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.js";

export const essayQueue = new Queue(
    "essay-evaluation",
    {
        connection: redisConnection
    }
);