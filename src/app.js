import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import path from 'path';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer( { server, path: '/web-socket' } );
// const wss = new WebSocketServer( { noServer: true} );

const PORT = 3000;

const staticPath = path.resolve('public');
app.use(express.static(staticPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

wss.on('connection', (socket, req) => {
    console.log('a user connected');

    socket.on('message', data => {
        const pesan = JSON.parse(data);

        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`<div hx-swap-oob="beforeend:#chats"><p>${pesan.chat_message}</p></div>`);
            }
        });
    })

    socket.on('close', () => {
        console.log(`a user disconnected`);
    })
})

app.get('/user/:username', (req, res) => {
    const name = req.params.username;
    res.send(`<p>Welcome to chatX! ${name}</p>`);
})

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));