class Cloud {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);

    this.particles = [];
    for (var i = 0; i < 10; i++) {
      this.particles[i] = new CloudParticle(this.pos.x + random(20, 120), this.pos.y + random(20, 60));
    }
  }

  update() {
    noiseDetail(2, 0.2);
    this.acc.x = 50 * noise(t);
    this.acc.y = 50 * noise(t + 100);
  }

  show() {
    this.particles.forEach((particle) => {
      //particle.behaviors();
      particle.update();
      particle.show();
    });
  }
}

class CloudParticle {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);
    this.vel = createVector();
    this.acc = createVector(0, 0);
    this.target = p5.Vector.random2D();
    this.maxSpeed = 10;
    this.maxSpeed = 1;

    this.r = floor(random(30, 60));
    this.alpha = 80;
    this.timeOffset = {
      "val1": random(0, 50),
      "val2": random(0, 50)
    };
  }

  /* Steering
  applyForce(f) {
    this.pos.add(f);
  }

  // Behaviors
  behaviors() {
    //var arrive = this.arrive(this.target);
    let mouse = createVector(mouseX, mouseY);
    let flee = this.flee(mouse);
    this.applyForce(flee);
  }

  // Steer
  flee(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d < 50) {
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  // Arrive
  arrive(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxspeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxspeed);
    }
    desired.setMag(speed);
    //desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  */

  update() {
    noiseDetail(2, 0.2);
    this.vel.x = 20 * noise(t + this.timeOffset.val1);
    this.vel.y = 20 * noise(t + this.timeOffset.val2);

    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  show() {
    fill(255, this.alpha);
    noStroke();
    let x = this.pos.x;
    let y = this.pos.y;
    ellipse(x, y, this.r);
  }


  // Polarkoordinaten
  /*show() {
    fill(255, this.alpha);
    strokeWeight(4);
    stroke(255, this.alpha);
    for (var i = 0; i < 360; i++) {
      let x = map(i, 0, 360, 2, this.r) * cos(i) + this.pos.x + this.acc.x;
      let y = map(i, 0, 360, 2, this.r) * sin(i) + this.pos.y + this.acc.y;
      point(x, y);
    }
  }*/

}