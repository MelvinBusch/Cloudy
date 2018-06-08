class Rain {
  constructor() {
    this.pos = createVector(width / 2, 50);
    this.vel = createVector(random(-.5, .5), random(4, 8));

    this.r = 8;
    this.alpha = 255;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    this.alpha -= 3;
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