const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods:"GET POST"
  }
});

io.on('connection', (socket) => {
  socket.on('user_joined', (data) => {
    console.log(data)
    socket.join(data);
    socket.on('receive_message',(data)=>{
      console.log(data)
      socket.to(data.room).emit('getMessageFromEveryone',data)
    })
  })
})
server.listen(3001, () => {
  console.log('listening on *:3001');
});