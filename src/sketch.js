import Flock from "./Flock";
import Boid from "./Boid";

function sketch(p5) {
  let flock;

  p5.setup = () => {
    p5.createCanvas(600, 400, p5.WEBGL);
    flock = new Flock(p5);
    for (let i = 0; i < 100; i++) {
      flock.addBoid(new Boid(0, 0, p5));
    }
  };

  p5.draw = () => {
    p5.background(0);
    flock.run();
  };
}

export default sketch;
