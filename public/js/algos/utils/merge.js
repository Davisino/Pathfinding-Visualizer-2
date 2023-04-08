export function merge(currVertex, vertexToMerge) {
  const element = document.getElementById(vertexToMerge.data);
  if (element && element.className != "wall") {
    currVertex.addEdge(vertexToMerge, 1);
  } else {
    console.log(`There is an error! element is ${element}`);
  }
}
