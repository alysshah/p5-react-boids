class Boid {
  constructor(x, y, p5) {
    this.p5 = p5;
    this.acceleration = p5.createVector(0, 0);
    this.velocity = p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
    this.position = p5.createVector(x, y);
    this.r = 2.0;
    this.maxspeed = 3;
    this.maxforce = 0.2;
  }

  run(boids, p5) {
    this.flock(boids, p5);
    this.update();
    this.borders(p5);
    this.render(p5);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  flock(boids, p5) {
    let sep = this.separation(boids, p5);
    // let ali = this.alignment(boids);
    // let coh = this.cohesion(boids);
    let avo = this.avoid();
    sep.mult(1.5);
    // ali.mult(1.0);
    // coh.mult(1.0);
    avo.mult(2.5);
    this.applyForce(sep);
    // this.applyForce(ali);
    // this.applyForce(coh);
    this.applyForce(avo);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  seek(target) {
    //     let desired = p5.Vector.sub(target, this.position);
    //     desired.normalize();
    //     desired.mult(this.maxspeed);
    //     let steer = p5.Vector.sub(desired, this.velocity);
    //     steer.limit(this.maxforce);
    //     return steer;
  }

  render(p5) {
    let speed = this.velocity.mag();
    let theta = this.velocity.heading() + p5.radians(90);
    let col = getColorFromSpeed(speed, this.maxspeed, p5);
    p5.fill(col);
    p5.stroke(col);
    p5.push();
    p5.translate(this.position.x, this.position.y);
    p5.rotate(theta);
    p5.beginShape();
    p5.vertex(0, -this.r * 2);
    p5.vertex(-this.r, this.r * 2);
    p5.vertex(this.r, this.r * 2);
    p5.endShape(p5.CLOSE);
    p5.pop();
  }

  borders(p5) {
    if (this.position.x < -this.r) this.position.x = p5.width + this.r;
    if (this.position.y < -this.r) this.position.y = p5.height + this.r;
    if (this.position.x > p5.width + this.r) this.position.x = -this.r;
    if (this.position.y > p5.height + this.r) this.position.y = -this.r;
  }

  separation(boids, p) {
    let desiredseparation = 25.0;
    let steer = p.createVector(0, 0);
    let count = 0;
    for (const other of boids) {
      //       let d = p5.Vector.dist(this.position, other.position);
      //       if (d > 0 && d < desiredseparation) {
      //         let diff = p5.Vector.sub(this.position, other.position);
      //         diff.normalize();
      //         diff.div(d);
      //         steer.add(diff);
      //         count++;
      //       }
    }
    if (count > 0) {
      steer.div(count);
    }
    if (steer.mag() > 0) {
      //       steer.normalize();
      //       steer.mult(this.maxspeed);
      //       steer.sub(this.velocity);
      //       steer.limit(this.maxforce);
    }
    return steer;
  }

  alignment(boids) {
    let neighbordist = 50;
    let sum = this.p5.createVector(0, 0);
    let count = 0;
    for (const other of boids) {
      //       let d = p5.Vector.dist(this.position, other.position);
      //       if (d > 0 && d < neighbordist) {
      //         sum.add(other.velocity);
      //         count++;
      //       }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      //       let steer = p5.Vector.sub(sum, this.velocity);
      //       steer.limit(this.maxforce);
      //       return steer;
    } else {
      return this.p5.createVector(0, 0);
    }
  }

  cohesion(boids) {
    let neighbordist = 50;
    let sum = this.p5.createVector(0, 0);
    let count = 0;
    for (const other of boids) {
      //       let d = p5.Vector.dist(this.position, other.position);
      //       if (d > 0 && d < neighbordist) {
      //         sum.add(other.position);
      //         count++;
      //       }
    }
    if (count > 0) {
      sum.div(count);
      //       return this.seek(sum);
    } else {
      return this.p5.createVector(0, 0);
    }
  }

  avoid() {
    let mouse = this.p5.createVector(this.p5.mouseX, this.p5.mouseY);
    let desiredseparation = 100.0;
    let steer = this.p5.createVector(0, 0);
    //     let d = p5.Vector.dist(this.position, mouse);
    //     if (d > 0 && d < desiredseparation) {
    //       let diff = p5.Vector.sub(this.position, mouse);
    //       diff.normalize();
    //       diff.div(d);
    //       steer.add(diff);
    //     }
    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }
}

function getColorFromSpeed(speed, maxSpeed, p5) {
  let percent = speed / maxSpeed;
  let endColor = p5.color(0, 0, 255);
  let startColor = p5.color(255, 0, 50);
  let lerpedColor = p5.lerpColor(startColor, endColor, percent);
  return lerpedColor;
}

export default Boid;
