import { PriorityQueue } from "./DS/priorityQueue.js";
import { shortestPathBetween } from "./utils/dijkstras-shortest.js";
import * as creator from "../creator.js";
import { velocity } from "../creator.js";
export function useDijkstras(start, end) {
  const pathToColorDijkstras = shortestPathBetween(
    creator.tableGraph,
    creator.tableGraph.getVertexByValue(start),
    creator.tableGraph.getVertexByValue(end)
  );

  // TO DO EXTRACT ALL STRINGNS STARTING WITH $ AND DO THE SET TIME OUT SEPARATELY
  for (let i = 0; i < pathToColorDijkstras.length; i++) {
    if (pathToColorDijkstras[i][0] != "$") {
      setTimeout(() => {
        const barToColor = document.getElementById(pathToColorDijkstras[i]);
        barToColor.className = "visited";
        barToColor.style.borderColor = "white";
      }, i * velocity);
    } else {
      const newId = pathToColorDijkstras[i].slice(1);
      const stepsToShortestPath = document.getElementById(newId);
      if (stepsToShortestPath.className === "start") {
        continue;
      } else if (stepsToShortestPath.className === "end") {
        continue;
      } else {
        setTimeout(() => {
          stepsToShortestPath.className = "shortest-path";
        }, i * velocity);
      }
    }
  }
}

export const dijkstras = (graph, startingVertex) => {
  let animations = [];
  const distances = {};
  const previous = {};
  const queue = new PriorityQueue();

  queue.add({ vertex: startingVertex, priority: 0 });

  graph.vertices.forEach((vertex) => {
    distances[vertex.data] = Infinity;
    previous[vertex.data] = null;
  });

  distances[startingVertex.data] = 0;

  while (!queue.isEmpty()) {
    const { vertex } = queue.popMin();

    const box = document.getElementById(vertex.data);
    if (wasTargetPushed) {
      break;
    }
    animations.push(...findVerticesEdges(vertex, animations));
    vertex.edges.forEach((edge) => {
      const alternate = edge.weight + distances[vertex.data];
      const neighborValue = edge.end.data;

      if (alternate < distances[neighborValue]) {
        distances[neighborValue] = alternate;
        previous[neighborValue] = vertex;

        queue.add({ vertex: edge.end, priority: distances[neighborValue] });
      }
    });
  }

  wasTargetPushed = false;

  return { distances, previous, animations };
};

let wasTargetPushed = false;

function findVerticesEdges(vertex, animations) {
  let VerticesToColor = [];

  // If vertex has length 4: push all edges end;
  // Else:
  // TOP -> RIGHT -> DOWN -> LEFT
  // if TOP -> RIGHT -> DOWN -> LEFT right  push them in that order;
  //  MAKING SURE THE IDX IS NOT REPEATED
  if (vertex.edges.length && wasTargetPushed === false) {
    vertex.edges.map((x) => {
      const box = document.getElementById(x.end.data);
      if (box.className === "end") {
        wasTargetPushed = true;
      }
      if (box.className === "unvisited" && animations.indexOf(box.id) === -1) {
        VerticesToColor.push(x.end.data);
      }
    });
  }
  return VerticesToColor;
}
