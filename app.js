const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server: server });

wss.on('connection', ws => {
  console.log('A new client connected!');
  ws.send('Welcome new client!');
  ws.on('message', message => {
    console.log('received: %s', message);
  });
});

app.get('/', (req, res) => res.send('Hello World!'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
