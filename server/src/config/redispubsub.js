import dotenv from "dotenv";

// /var/www/redkalam/server/.env
// server/.env
dotenv.config({
    path: "/var/www/redkalam/server/.env"
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