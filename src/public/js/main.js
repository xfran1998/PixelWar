// import {PixelWar} from './canvas.js';

// Conecting to socket server
const socket = io.connect('/app/pixelwar');

let pixelWar = new PixelWar();
pixelWar.drawGrid();

pixelWar.addListeners(data => {
  socket.emit('pixel_click_client', data);
});

socket.on('pixel_click_server', data => {
  pixelWar.drawPixel(data.x, data.y, data.color);
});


