export function merge(currVertex, vertexToMerge) {
  if (document.getElementById(vertexToMerge.data).className != "wall") {
    currVertex.addEdge(vertexToMerge, 1);
  }
}
