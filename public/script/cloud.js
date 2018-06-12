class Cloud {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);

    this.particles = [];
    for (var i = 0; i < 60; i++) {
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
    this.randomArea = 300;
    this.origin = createVector(width / 2, height / 2);

    this.randomTarget = p5.Vector.sub(this.spawn, this.origin).mult(8);
    console.log(this.randomTarget);

    this.vel = p5.Vector.random2D();
    this.acc = createVector();

    this.maxSpeed = .5; // .5
    this.maxForce = .08; // .08

    // this.maxSpeed = .5 / 10;
    // this.maxForce = .08 / 10;

    this.r = floor(random(20, 60));
    this.alpha = floor(random(40, 80));
  }

  behaviors() {
    let arrive = this.arrive(this.target);
    let flee = this.seek(this.spawn);

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
    ellipse(this.pos.x, this.pos.y, this.r);
  }

  applyForce(_force) {
    this.acc.add(_force);
  }

  arrive(_target) {
    let desired = p5.Vector.sub(_target, this.pos);
    let d = desired.mag();
    let speed = 200;

    if (d < this.randomArea) {
      speed = map(d, 1, 200, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }

  seek(_target) {
    let desired = p5.Vector.sub(_target, this.pos);
    let d = desired.mag();
    if (d < 200) {
      desired.setMag(this.maxSpeed);
      desired.mult(-1);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }
}

//this.randomTarget = createVector(floor(random(this.pos.x - this.randomArea, this.pos.x + this.randomArea)), floor(random(this.pos.y - this.randomArea, this.pos.y + this.randomArea)));
/*if (this.spawn.x > width / 2) {
  if (this.spawn.y > height / 2) {
    this.randomTarget = createVector(random(width / 2, width + 200), random(height, height + 200));
  } else {
    this.randomTarget = createVector(random(width / 2, width + 200), random(0, -200));
  }
} else {
  if (this.spawn.y > height / 2) {
    this.randomTarget = createVector(random(0, -200), random(height, height + 200));
  } else {
    this.randomTarget = createVector(random(0, -200), random(0, -200));
  }
}*/
// this.randomTarget = createVector();
// this.randomTarget.x = this.spawn.x;
// this.randomTarget = p5.Vector.add(this.origin, this.origin.sub(this.spawn));