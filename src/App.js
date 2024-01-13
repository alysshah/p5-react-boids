import * as React from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import "./App.css";
import sketch from "./sketch";

function App() {
  return <ReactP5Wrapper sketch={sketch} />;
}

export default App;
