const socket = io();
    let room = null;

    const roomForm = document.getElementById('room-form');
    const chat = document.getElementById('chat');

    document.getElementById('join').addEventListener('click', () => {
      room = document.getElementById('room').value;
      socket.emit('join', room);
      roomForm.style.display = 'none';
      chat.style.display = 'block';
    });

    document.getElementById('create').addEventListener('click', () => {
      room = Math.random().toString(36).substr(2, 7); // Generate a random room name
      socket.emit('join', room);
      roomForm.style.display = 'none';
      chat.style.display = 'block';
    });

    document.getElementById('send').addEventListener('click', () => {
      const message = document.getElementById('message').value;
      socket.emit('chat message', message);
      document.getElementById('message').value = '';
    });

    socket.on('user joined', (userId) => {
      addMessage(`User ${userId} joined the room.`);
    });

    socket.on('user left', (userId) => {
      addMessage(`User ${userId} left the room.`);
    });

    socket.on('chat message', ({ user, message }) => {
      addMessage(`User ${user}: ${message}`);
    });


    function addMessage(text) {
      const li = document.createElement('li');
      li.textContent = text;
      document.getElementById('messages').appendChild(li);
    }