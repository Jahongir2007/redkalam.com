import dotenv from "dotenv";

// /var/www/redkalam/server/.env
// server/.env
dotenv.config({
    path: "/var/www/redkalam/server/.env"
});
import Anthropic from "@anthropic-ai/sdk";

export const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

console.log(
    "ANTHROPIC:",
    process.env.ANTHROPIC_API_KEY ? "OK" : "MISSING"
);

