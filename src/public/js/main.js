// Conecting to socket server
const socket = io.connect('/app/pixelwar');
console.log('Hi!');

socket.on('ping', () => {
  socket.emit('pong', 'pong');
});