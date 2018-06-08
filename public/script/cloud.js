class Cloud {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);

    this.particles = [];
    for (var i = 0; i < 80; i++) {
      this.particles[i] = new CloudParticle(this.pos.x + random(20, 120), this.pos.y + random(20, 60));
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
    this.randomArea = 400;
    this.randomTarget = createVector(random(this.pos.x - this.randomArea, this.pos.x + this.randomArea), random(this.pos.y - this.randomArea, this.pos.y + this.randomArea));
    this.vel = p5.Vector.random2D();
    this.acc = createVector();

    this.maxSpeed = 5; //5
    this.maxForce = .4; //.4

    this.r = floor(random(20, 60));
    this.alpha = 80;
  }

  behaviors() {
    // let seek = this.seek(this.target);
    // this.applyForce(seek);

    let arrive = this.arrive(this.target);
    this.applyForce(arrive);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);

    if (rps > 2) {
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
    ellipse(this.pos.x, this.pos.y, this.r);
  }

  applyForce(_force) {
    this.acc.add(_force);
  }

  arrive(_target) {
    let desired = p5.Vector.sub(_target, this.pos);
    let d = desired.mag();
    let speed = 100;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxSpeed);
    }
    this.alpha = map(speed, 0, this.maxSpeed, 80, 0);
    desired.setMag(speed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }

  seek(_target) {
    let desired = p5.Vector.sub(_target, this.pos);
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }
}