require('dotenv').config()
const WebSocket = require('ws');
const fs = require('fs');


const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT

const ws = new WebSocket(`ws://localhost:${WEBSOCKET_PORT}`);

ws.onopen = () => {
    console.log('Now connected');
};


ws.onmessage = (event) => {

    console.log(event.data)
    fs.appendFile('log.txt', event.data+'\n', function (err) {
        if (err) throw err;
        // console.log(event.data);
      });
};

