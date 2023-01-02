import { createContext } from "react";
import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_REACT_APP_WEBSOCKET_URL;

export const socket = io(socketUrl, {
    withCredentials: true,
});

export const SocketContext = createContext(socket);