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
// app.set('trust proxy', true);

// GET home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => {console.log(`runing on port ${PORT}`);});

// Socket.io connect with path http://localhost/app/pixelwar
io.of('/app/pixelwar')
  .on('connection', (socket) => {
    // get client ip
    // const ip = socket.request.connection.remoteAddress;""
    const ip = socket.handshake.headers['x-forwarded-for'];
    console.info(`${ip} connected to pixelwar`);

    socket.on('pixel_click_client', (data) => {
      console.log(`${ip} clicked pixel: ${data.x}, ${data.y}`);
      socket.broadcast.emit('pixel_click_server', data);
    });
});



