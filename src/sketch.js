import Flock from "./Flock";
import Boid from "./Boid";

function sketch(p5) {
  let flock;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    flock = new Flock(p5);
    for (let i = 0; i < 400; i++) {
      flock.addBoid(
        new Boid(
          p5.random(-p5.width / 2, p5.width / 2),
          p5.random(-p5.height / 2, p5.height / 2),
          p5
        )
      );
    }
  };

  p5.draw = () => {
    p5.background(0);
    flock.run();
  };
}

export default sketch;
