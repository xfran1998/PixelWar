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

// Default route
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


// Socket.io connect with path http://localhost/app/pixelwar
io.of('/app/pixelwar')
  .on('connection', (socket) => {
    console.log('a user connected to pixelwar!!!');

    // test client connection
    socket.emit('ping', 'pong');
});



