class Flock {
  constructor(p5) {
    this.boids = [];
    this.p5 = p5;
  }

  run() {
    for (let boid of this.boids) {
      boid.run(this.boids, this.p5);
    }
  }

  addBoid(b) {
    this.boids.push(b);
  }
}

export default Flock;
