const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    let userName = '';

    socket.on('join', (name) => {
        userName = name;
        socket.broadcast.emit('message', {
            user: 'System',
            text: `${userName} joined the chat.`,
            time: new Date().toLocaleTimeString()
        });
    });

    socket.on('chatMessage', (msg) => {
        io.emit('message', {
            user: userName,
            text: msg,
            time: new Date().toLocaleTimeString()
        });
    });

    socket.on('disconnect', () => {
        if (userName) {
            io.emit('message', {
                user: 'System',
                text: `${userName} left the chat.`,
                time: new Date().toLocaleTimeString()
            });
        }
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
