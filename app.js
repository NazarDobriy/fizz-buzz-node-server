const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const path = require('path');
const WebSocket = require('ws');

const server = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app);

const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  console.log('A new client connected!');
  ws.send('Welcome new client!');
  ws.on('message', message => {
    console.log('received: %s', message);
  });
});

app.get('/', (req, res) => res.send('Hello World!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
