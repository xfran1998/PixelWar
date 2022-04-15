class PixelWar{
  constructor(){
    this.canvas = document.getElementById('pixel-war-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.color_input = document.getElementById('my-color-pixel');
    this.my_color = this.color_input.value;

    this.canvas.width = 800;
    this.canvas.height = 800;
    
    this.grid = {rows: 30, cols: 30};
    this.canvas_size = {width: this.canvas.width, height: this.canvas.height};
    this.cell_size = {width: this.canvas_size.width / this.grid.cols, height: this.canvas_size.height / this.grid.rows};
  }
  
  addListeners(callback){
    this.canvas.addEventListener('click', e => {
      this.drawPixel(e.offsetX, e.offsetY, this.my_color);
      callback({x: e.offsetX, y: e.offsetY, color: this.my_color});
    });
  
    this.color_input.addEventListener('change', e => {
      this.my_color = e.currentTarget.value;
    });
  }

  drawGrid(){
    // draw horizontal lines
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 1;

    for(let i = 1; i < this.grid.rows; i++){
      this.ctx.beginPath();
      this.ctx.moveTo(0, i * this.cell_size.height);
      this.ctx.lineTo(this.canvas_size.width, i * this.cell_size.height);
      this.ctx.stroke();
      // this.ctx.closePath();
    }

    // draw vertical lines
    for(let i = 1; i < this.grid.cols; i++){
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.cell_size.width, 0);
      this.ctx.lineTo(i * this.cell_size.width, this.canvas_size.height);
      this.ctx.stroke();
      // this.ctx.closePath();
    }
  }

  drawPixel(x, y, color){ 
    let cell = {x: Math.floor(x / this.cell_size.width), y: Math.floor(y / this.cell_size.height)};
    
    console.log(`cell: ${cell.x}, ${cell.y}`);
    this.ctx.fillStyle= color;
    this.ctx.beginPath();
    this.ctx.fillRect(cell.x*this.cell_size.width, cell.y*this.cell_size.height, this.cell_size.width, this.cell_size.height);
    
    this.ctx.strokeRect(cell.x*this.cell_size.width, cell.y*this.cell_size.height, this.cell_size.width, this.cell_size.height);
  }
}

// export default {PixelWar};