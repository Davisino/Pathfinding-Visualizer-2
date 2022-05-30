import * as creator from "./creator.js";
export function updateWidthAndHeight() {
  const sliderWidth = document.getElementById("myWidth").value;
  const sliderHeight = document.getElementById("myHeight").value;
  console.log(sliderWidth, sliderHeight);
  // erase current table.
  document.getElementById("grid").innerHTML = "";
  creator.generateTable(Number(sliderWidth), Number(sliderHeight));
}
