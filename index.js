const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {title: "Socket.io chat example"});
});

const port = process.env.PORT || 3030;
server.listen(port, () => {
  console.log(`Server started and listening on port ${port}`);
});

// emit & receive messages
io.on('connection', (socket) => {
  console.log(`Someone connected with socket id: ${socket.id}`);

  socket.on("chat", (data) => {
    console.log(data);
    // broadcast the same message to all except the sender
    socket.broadcast.emit('chat', data);
  });
});
