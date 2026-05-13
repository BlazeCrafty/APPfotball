const express = require("express");

const app = express();

const http = require("http").createServer(app);

const io = require("socket.io")(http);

app.use(express.static(__dirname));

io.on("connection",(socket)=>{

    console.log("Player connected");

});

http.listen(3000,()=>{

    console.log("Football server started!");

});