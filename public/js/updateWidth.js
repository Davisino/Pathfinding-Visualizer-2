import * as Astar from "./algos/astar/astar.js";
import * as creator from "./creator.js";

export function updateWidthAndHeight() {
  const sliderWidth = document.getElementById("myWidth").value;
  const sliderHeight = document.getElementById("myHeight").value;
  document.getElementById("grid").innerHTML = "";
  creator.generateTable(Number(sliderWidth), Number(sliderHeight));
  Astar.generateAstarTable(Number(sliderWidth), Number(sliderHeight));
}
