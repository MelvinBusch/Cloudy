// Wolke
class Cloud {
  constructor(_xPos, _yPos, _image) {
    // Cloud
    this.x = _xPos;
    this.y = _yPos;
    this.image = _image;
    this.imageScale = Math.random() * .3 + .2;
    this.imageWidth = this.image.width * this.imageScale;
    this.imageHeight = this.image.height * this.imageScale;

    // Animation
    this.xAcc;
    this.yAcc;
    this.noise = new PerlinNoise(1.5, .005);
    this.frameCountOffset = Math.floor(Math.random() * 128);

    // Rain
    this.raindrops = [];
  }

  shake() {
    this.xAcc = this.noise.noise(frameCount);
    this.yAcc = this.noise.noise(frameCount + this.frameCountOffset);
  }

  show() {
    ctx.globalAlpha = .6;
    ctx.drawImage(this.image, this.x + this.xAcc, this.y + this.yAcc, this.imageWidth, this.imageHeight);

    // Raindrops
    this.raindrops.forEach((raindrop) => {
      raindrop.show();
      raindrop.falldown();
    });
  }

  callRain(_drops) {
    for (let i = 0; i < _drops; i++) {
      let drop = new Raindrop(this.x + this.imageWidth / 2, this.y + this.imageHeight);
      this.raindrops[i] = drop;
    }
  }
}

// Regentropfen
class Raindrop {
  constructor(_x, _y) {
    this.r = 4;
    this.speed = Math.random() * 9.81 + 4;
    this.x = _x;
    this.y = _y;
    this.currentY = this.y;
    this.alpha = .8;
  }

  falldown() {
    this.currentY += this.speed;
  }

  show() {
    ctx.beginPath();
    ctx.ellipse(this.x, this.currentY, this.r, this.r, Math.PI / 180, 0, 2 * Math.PI);
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "rgb(50, 207, 239)"; //"rgb(255,0,0)"; //
    ctx.fill();
  }
}