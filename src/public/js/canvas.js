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

    this.couldPrint = true;
  }

  initWar(canvas_war_pixels){
    canvas_war_pixels.forEach((row, x) => {
      row.forEach((color, y) => {
        this.drawPixel(x, y, color);
      });
    });
  }
  
  addListeners(callback){
    this.canvas.addEventListener('click', e => {
      let cell = {x: Math.floor(e.offsetX / this.cell_size.width), y: Math.floor(e.offsetY / this.cell_size.height)};

      this.drawPixel(cell.x, cell.y, this.my_color);
      
      if (this.couldPrint) 
        callback({x: cell.x, y: cell.y, color: this.my_color});
      
      if (!this.couldPrint) return;
      
      this.couldPrint = false;
      setTimeout(() => {
        this.couldPrint = true;
      }, 5000);
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
    console.log(`cell: ${x}, ${y}`);
    this.ctx.fillStyle= color;
    this.ctx.beginPath();
    this.ctx.fillRect(x*this.cell_size.width, y*this.cell_size.height, this.cell_size.width, this.cell_size.height);
    
    this.ctx.strokeRect(x*this.cell_size.width, y*this.cell_size.height, this.cell_size.width, this.cell_size.height);
  }
}

// export default {PixelWar};