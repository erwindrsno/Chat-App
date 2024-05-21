import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer( { server, path: '/web-socket' } );

const PORT = 3000;

app.use(express.static('public'));

wss.on('connection', (socket) => {
    console.log(`a user connected`);

    socket.send("Welcome to chat app! -server");

    socket.on('message', message => {
        console.log(`the message is ${message}`);
    })

    socket.on('close', () => {
        console.log(`${socket.id} a user disconnected`);
    })
})

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));