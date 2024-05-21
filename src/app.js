import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import path from 'path';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer( { server, path: '/web-socket' } );

const PORT = 3000;

const staticPath = path.resolve('public');
app.use(express.static(staticPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

wss.on('connection', (socket) => {
    console.log(`a user connected`);

    socket.send("Welcome to chat app! -server");

    socket.on('message', data => {
        const pesan = JSON.parse(data);
        console.log(pesan.chat_message);
    })

    socket.on('close', () => {
        console.log(`${socket.id} a user disconnected`);
    })
})

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));