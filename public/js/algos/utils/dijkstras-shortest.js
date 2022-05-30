import { dijkstras } from "../dijkstras.js";

export const shortestPathBetween = (graph, startingVertex, targetVertex) => {
  const { distances, previous, animations } = dijkstras(graph, startingVertex);
  const distance = distances[targetVertex.data];
  const path = [];

  let vertex = targetVertex;
  while (vertex) {
    path.unshift(`$${vertex.data}`);
    vertex = previous[vertex.data];
  }

  return animations.concat(path);
};
