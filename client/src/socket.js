import { io } from "socket.io-client";

export const socket = io("https://redkalam.com", {
    autoConnect: true,
    transports: ["websocket", "polling"],
    withCredentials: true
});