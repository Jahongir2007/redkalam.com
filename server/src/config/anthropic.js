import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve("server/.env")
});
import Anthropic from "@anthropic-ai/sdk";

export const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

console.log(
    "ANTHROPIC:",
    process.env.ANTHROPIC_API_KEY ? "OK" : "MISSING"
);

