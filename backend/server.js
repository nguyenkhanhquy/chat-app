require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const FE_URL = process.env.FE_URL;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: FE_URL,
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("sendMessage", (message) => {
        io.emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
