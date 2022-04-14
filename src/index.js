// Server variables
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const path = require('path');

// Start server
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const io = socketio(server);
app.set('trust proxy', true);

// GET home page
app.get('/', (req, res) => {
  // get client ip
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log(`${ip} connected`);
  
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});