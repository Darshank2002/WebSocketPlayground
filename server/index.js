const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("User Connected  ");
  io.emit("chat message", `User joined with id ${socket.id}`);
  socket.on("chat message", (msg) => {
    console.log("We got the message : ", msg);
    io.emit("chat message", msg);
  });
  socket.on("typing", (isTyping) => {
    console.log(isTyping.isTyping);
    io.emit("typing", { t: isTyping.isTyping, id: `${socket.id}` });
  });
  socket.on("disconnect", (socket) => {
    console.log("Diconnected", { socket });
  });
});

server.listen(3000, () => {
  console.log("listening on :3000");
});
