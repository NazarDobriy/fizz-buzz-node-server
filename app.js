const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const path = require('path');
const WebSocket = require('ws');

const server = https.createServer({
    key: fs.readFileSync(path.resolve('cert/key.pem')),
    cert: fs.readFileSync(path.resolve('cert/cert.pem'))
}, app);

const wss = new WebSocket.Server({ server });

app.get('/', (req, res) => res.send('Hello World!'));

const PORT = process.env.PORT || 3000;
server.listen(PORT);

wss.on('connection', ws => {
  console.log('A new client connected!');
  ws.send('Welcome new client!');
  ws.on('message', message => {
    console.log('received: %s', message);
  });
});
