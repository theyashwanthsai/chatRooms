const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve static files from the 'public' directory

const rooms = new Map();

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (room) => {
    socket.join(room);
    socket.room = room; // Store the current room in the socket object

    if (!rooms.has(room)) {
      rooms.set(room, []);
    }

    const users = rooms.get(room);
    users.push(socket.id);

    // Notify everyone in the room about the new user
    io.to(room).emit('user joined', socket.id);
  });

  socket.on('chat message', (message) => {
    io.to(socket.room).emit('chat message', { user: socket.id, message });
  });

  socket.on('disconnect', () => {
    if (socket.room) {
      const users = rooms.get(socket.room);
      if (users) {
        const index = users.indexOf(socket.id);
        if (index !== -1) {
          users.splice(index, 1);
        }
      }
      // Notify everyone in the room that a user left
      io.to(socket.room).emit('user left', socket.id);
    }
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});




