/**
 * This Breadth First Search finds a path but not necessarily the shortest path.
 * It must explore the entire graph, which isn't very efficient.
 * It then reconstructs the path it took from the start to the end.
 */

import { createSimpleGraph } from "./createSimpleGraph.ts";

// Setup for making array and tracking visited
const graph = createSimpleGraph();

const bfsFindPath = (start: number, end: number) => {
  const previous = traverseGraph(start);
  return reconstructPath(start, end, previous);
}

const traverseGraph = (start: number) => {
  // Create a queue and track visited nodes
  const queue = [start];
  const visited = Array(graph.length).fill(false);
  visited[start] = true;

  // Track which was the previous node for any node in the queue
  const previous = Array(graph.length);
  while (queue.length) {
    const current = queue.shift()!; // Get node from queue
    const neighbours = graph[current]; // Get neighbouring nodes

    neighbours.forEach(node => {
      // If we haven't visited this neighbour
      if (!visited[node]){
        queue.push(node); // Add to queue
        visited[node] = true; // Mark visited
        previous[node] = current; // Note that it came from the current node
      }
    })
  }
  return previous;
}

const reconstructPath = (start: number, end: number, previous: number[]) => {
  const path = [];
  // Look at previous tracking array. Start at end and work backwards.
  for (let at = end; at != null; at = previous[at]){
    path.unshift(at);
  }

  // Ensure we only return path if it made it back to start
  if (path.at(0) == start){
    return path;
  }
  return [];
}

const foundPath = bfsFindPath(0, 4);
console.assert(foundPath.length == 3); // Path is 0, 1, 4
