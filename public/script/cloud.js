class Cloud {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);

    this.particles = [];
    for (var i = 0; i < 60; i++) { // 60
      this.particles[i] = new CloudParticle(this.pos.x + random(-80, 80), this.pos.y + random(-50, 50));
    }
  }

  show() {
    this.particles.forEach((particle) => {
      particle.behaviors();
      particle.update();
      particle.show();
    });
  }
}

class CloudParticle {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);
    this.spawn = createVector(_x, _y);
    this.target = createVector(_x, _y);
    this.origin = createVector(width / 2, height / 2);

    this.randomTarget = this.calcTarget(); // (p5.Vector.sub(this.spawn, this.origin).mult().add(this.origin));

    this.vel = p5.Vector.random2D();
    this.acc = createVector();

    this.maxSpeed = .5; // .5
    this.maxForce = 1; // .08

    this.r = floor(random(20, 60));
    this.alpha = floor(random(40, 80));
  }

  calcTarget() {
    let ot = p5.Vector.sub(this.spawn, this.origin);
    let vectorDist = this.spawn.dist(this.origin);
    let maxDist = sqrt(width * width + height * height);
    let factor = map(vectorDist, 0, maxDist, 8, 3);
    return ot.mult(factor).add(this.origin);
  }

  behaviors() {
    let arrive = this.arrive(this.target);
    this.applyForce(arrive);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);

    if (rps > .5) {
      this.target.x = this.randomTarget.x;
      this.target.y = this.randomTarget.y;
    } else {
      this.target.x = this.spawn.x;
      this.target.y = this.spawn.y;
    }
  }

  show() {
    fill(255, this.alpha);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 1.5);
  }

  applyForce(_force) {
    this.acc.add(_force);
  }

  arrive(_target) {
    let desired = p5.Vector.sub(_target, this.pos);
    let d = desired.mag();
    let speed = 10;

    if (d < 200) {
      speed = map(d, 0, 10, 0, this.maxspeed);
    }
    desired.setMag(speed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }
}