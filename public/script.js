const socket = io();
    let room = null;
    let userName = "No";

    const roomForm = document.getElementById('room-form');
    const chat = document.getElementById('chat');
    function getName(){
        return prompt("Enter Username")
    }
    document.getElementById('join').addEventListener('click', () => {
        const name = getName();
        room = document.getElementById('room').value;

        socket.emit('join', { room, name });
        roomForm.style.display = 'none';
        chat.style.display = 'block';
    });

    document.getElementById('create').addEventListener('click', () => {
        const name = getName();
        room = document.getElementById('room').value;

        socket.emit('join', { room, name });

        roomForm.style.display = 'none';
        chat.style.display = 'block';
        userName = name;
        console.log(userName);
    });

    document.getElementById('send').addEventListener('click', () => {
        const message = document.getElementById('message').value;
        console.log(userName);
        socket.emit('chat message', {message });
        // addMessage(`${userName}: ${message}`);
        document.getElementById('message').value = '';
    });
    

    socket.on('user joined', (name) => {

        addMessage(`User ${name} joined the room.`);
    });

    socket.on('user left', (name) => {
        addMessage(`User ${name} left the room.`);
    });

    socket.on('show chat message', ({name, message}) => {
        addMessage(`${name}: ${message}`);
    });


    function addMessage(text) {
        const li = document.createElement('li');
        li.textContent = text;
        document.getElementById('messages').appendChild(li);
    }