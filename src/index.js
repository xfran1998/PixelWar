// Server variables
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const mongoose = require('mongoose');

// Start server
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const io = socketio(server);

const grid = {rows: 30, cols: 30};
let PIXEL_WAR = [];

for (let i = 0; i < grid.cols; i++) {
  PIXEL_WAR.push([]);
  for (let j = 0; j < grid.rows; j++) {
    PIXEL_WAR[i].push('#ffffff');
  }
}
// app.set('trust proxy', true);


// DATABASE Mongoose connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://unexpectedbug:stream_pixelwar@cluster0.grmez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
  console.log('Connected to database');

  MongoosePixelWarInit();
}

async function MongoosePixelWarInit(){
  const pixel_war_schema = new mongoose.Schema({
    PixelGrid: [[]],
  });
  
  pixel_war_schema.methods.changeColor = function changeColor(x, y, color) {
    this.PixelGrid[x][y] = color;
  };
  
  const PixelGrid = mongoose.model('PixelGrid', pixel_war_schema);


  const PixelWarGrid = PixelGrid.findOne({}, (err, Pixelgrid) => {
    if (err) {
      console.log(err);
    } else {
      if (Pixelgrid) {
        console.log('PixelGrid found');
        console.log(Pixelgrid.PixelGrid[0]);
        // FROM HERE
        PIXEL_WAR = Pixelgrid.PixelGrid;
      } else {
        console.log('PixelGrid not found');
        const newPixelGrid = new PixelGrid({
          PixelGrid: PIXEL_WAR,
        });
        newPixelGrid.save();
      }
    }
  });

  // update [0][1] from database
  let x = 0;
  let y = 0;

  PIXEL_WAR[x][y] = '#919';
  console.log('PIXEL_WAR');
  console.log(PIXEL_WAR[0]);


  // update database
  PixelGrid.findOne({}, (err, Pixelgrid) => {
    if (err) {
      console.log(err);
    } else {
      if (Pixelgrid) {
        console.log('PixelGrid found');
        // Pixelgrid.changeColor(x, y, '#000');
        Pixelgrid.PixelGrid = PIXEL_WAR;
        console.log(Pixelgrid.PixelGrid[0]);
        Pixelgrid.save();
      }
    }
  });

  // console.log(await TestViwer.find());
}

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
    socket.emit('init_war_server', PIXEL_WAR);


    socket.on('pixel_click_client', (data) => {
      console.log(`${ip} clicked pixel: ${data.x}, ${data.y}`);
      PIXEL_WAR[data.x][data.y] = data.color;
      socket.broadcast.emit('pixel_click_server', data);
    });
});