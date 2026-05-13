const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname));

let rooms = {};

io.on("connection", (socket) => {

    socket.on("createRoom", (roomId) => {
        socket.join(roomId);

        if (!rooms[roomId]) {
            rooms[roomId] = {};
        }

        rooms[roomId][socket.id] = {
            x: 0,
            y: 1,
            z: 0
        };

        socket.roomId = roomId;

        io.to(roomId).emit("roomUpdate", rooms[roomId]);
    });

    socket.on("move", (data) => {
        let roomId = socket.roomId;
        if (!roomId) return;

        rooms[roomId][socket.id] = data;

        io.to(roomId).emit("roomUpdate", rooms[roomId]);
    });

    socket.on("disconnect", () => {
        let roomId = socket.roomId;
        if (!roomId) return;

        delete rooms[roomId][socket.id];

        io.to(roomId).emit("roomUpdate", rooms[roomId]);
    });

});

http.listen(3000, () => {
    console.log("Server running");
});
