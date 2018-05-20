// Wolke
class Cloud {
  constructor(_xPos, _yPos, _image) {
    this.x = _xPos;
    this.y = _yPos;
    this.xAcc;
    this.yAcc;
    this.image = _image;
    this.imageScale = Math.random() * .3 + .2;
    this.noise = new PerlinNoise(1.5, .005);
    this.frameCountOffset = Math.floor(Math.random() * 20);
  }

  rain() {

  }

  shake() {
    this.xAcc = this.noise.noise(frameCount);
    this.yAcc = this.noise.noise(frameCount + this.frameCountOffset);
  }

  show() {
    let height = cloud2.width * this.imageScale;
    let width = cloud2.height * this.imageScale;
    ctx.globalAlpha = .6;
    ctx.drawImage(this.image, this.x + this.xAcc, this.y + this.yAcc, height, width);
  }
}

// Regentropfen
class Raindrop {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.z = Math.random();
    this.dropcount = 60;
    this.gravity = 1.98;
    this.speed = 6;
  }

  updatePosition() {}

  show() {
    // ctx.fillStyle = "red";
    ctx.ellipse(this.x, this.y, 50, 50, 45 * Math.PI / 180, 0, 2 * Math.PI);
  }
}

/*

Beschleunigung
a = v/t

*/