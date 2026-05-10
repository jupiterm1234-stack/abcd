const express = require("express");

const app = express();

const http = require("http").createServer(app);

const io = require("socket.io")(http);

// Serve static files from public folder
app.use(express.static("public"));

// Socket connection
io.on("connection", (socket) => {

    console.log("User connected");

    // Join room
    socket.on("join", (room) => {

        socket.join(room);

        console.log("User joined room: " + room);

    });

    // Receive message and send to room
    socket.on("message", (data) => {

        io.to(data.room).emit("message", data.text);

    });

});

// Start server
http.listen(4000, "0.0.0.0", () => {

    console.log("Server running on port 4000");

});