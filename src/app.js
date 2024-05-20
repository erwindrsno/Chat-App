import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.emit("greetings", "Welcome to chat app");

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    })
})

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));