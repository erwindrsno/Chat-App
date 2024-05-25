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

let message = [];

wss.on('connection', (socket, req) => {

    console.log(wss.clients);

    socket.send(`<div hx-swap-oob="beforebegin:#chats"><p>Welcome</p></div>`);

    socket.on('message', data => {
        const pesan = JSON.parse(data);
        console.log(pesan.chat_message);
        // message.push(pesan.chat_message);
        // socket.send("Your message is " + pesan);
        socket.send(`<div hx-swap-oob="beforeend:#chats"><p>${pesan.chat_message}</p></div>`);
        // console.log(data);
    })

    socket.on('close', () => {
        console.log(`a user disconnected`);
    })
})

app.get('chat', (req, res) => {
    res.send("haiiiii");
})

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));