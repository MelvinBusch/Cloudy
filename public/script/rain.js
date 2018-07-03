class Rain {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);
    this.vel = createVector(random(-.5, .5), random(4, 8));

    this.r = 8;
    this.alpha = 255;
    this.color = color(0, 0, 255);
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    this.alpha -= 10;
  }

  show() {
    fill(255, this.alpha);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r);
  }

  done() {
    return this.alpha < 0;
  }
}