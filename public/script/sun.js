class Sun {

  constructor() {
    this.pos = createVector(width * .66, height * .33);
    this.noise;
    this.size = 100;
    this.image = img[2];
  }

  show() {
    // this.image.resize();
    image(this.image, this.pos.x - (this.image.width / 2), this.pos.y - (this.image.height / 2));
  }
}