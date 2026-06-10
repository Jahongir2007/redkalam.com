import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve("server/.env")
});
import { Redis } from "ioredis";

export const publisher = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

export const subscriber = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});