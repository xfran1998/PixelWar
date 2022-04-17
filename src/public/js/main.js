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

socket.on('init_war_server', pixel_war => {
  pixelWar.initWar(pixel_war);
});

