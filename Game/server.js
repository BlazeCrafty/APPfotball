const express = require("express");

const path = require("path");

const app = express();

const http = require("http").createServer(app);

const io = require("socket.io")(http);

// Serve Public folder
app.use(express.static(path.join(__dirname, "Public")));

// Homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Public", "index.html"));
});

io.on("connection", (socket) => {

    console.log("Player connected");

});

http.listen(3000, () => {

    console.log("Football server started!");

});
