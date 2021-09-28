require('dotenv').config()
const express = require('express');
const path = require('path');
const WebSocket = require('ws'); // new
const app = express();

const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT

app.get('/heartbeat', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const socketServer = new WebSocket.Server({ port: WEBSOCKET_PORT });
console.log(`Websocket server listening at port ${WEBSOCKET_PORT}...`)

setInterval(() => {
    socketServer
        .clients
        .forEach(client => {
            d = new Date();
            dTest = (process.env.ENV === "dev") ? d.getSeconds(): d.getMinutes();

            if ( dTest  === 42 ) {
                message = `42 is the meaning of life`;
            } else {
                message = `I am alive at ${d}`;
            }

            client.send(message);
            console.log(`${message} is sent`);
        });
}, process.env.ENV === "dev"? 1000: 60000)

socketServer.on('connection', (socketClient) => {
    console.log('client connected');

    console.log('client Set length: ', socketServer.clients.size);

    socketClient.on('close', (socketClient) => {
        console.log('closed');
        console.log('Number of clients: ', socketServer.clients.size);
    });
});


const WEBSERVER_PORT = process.env.WEBSERVER_PORT
app.listen(WEBSERVER_PORT, () => {
    console.log(`Webserver listening http://localhost:${WEBSERVER_PORT}`);
});
