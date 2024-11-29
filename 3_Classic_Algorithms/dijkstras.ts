/**
 * Dijkstra's is a common algorithm for path finding. 
 * This implementation is the Eager version. It requires a priority queue.
 * Limitation: Cannot handle negative edge weights/costs.
 */

import { PriorityQueue } from "./PriorityQueue.ts";
import { createWeightedAdjacencyList, DagEdge } from "./trees.ts";

const dijkstras = (graph: DagEdge[][], start: number, end: number) => {
  // Build the correct path from start to end by back-tracking our steps
  const reconstructPath = () => {
    // Only do if within bounds
    if (end < 0 || end >= graph.length || start < 0 || start >= graph.length){
      throw new Error("Invalid node index");
    }

    const path: number[] = [];
    // If we never found the end, there's no path to make
    if (distances[end] == Infinity) return path;

    // Starting at the end, as long as the previous isn't undefined, add it to the path
    for (let at = end; at != undefined; at = previous[at]){
      path.unshift(at);
    }
    return path;
  } 

  const queue = new PriorityQueue(); // Use priority queue to track where we visit next
  queue.push({index: start, cost: 0}); // Starting node has no cost

  // Keep array of distances
  const distances = Array(graph.length).fill(Infinity);
  distances[start] = 0;
  // Keep array of visited nodes
  const visited = Array(graph.length).fill(false);
  // Keep array of previous nodes
  const previous = Array(graph.length);

  while(!queue.isEmpty()) {
    const currentNode = queue.pop();
    visited[currentNode.index] = true;
    
    // If it's most costly than another route we've found, skip it.
    if (currentNode.cost > distances[currentNode.index]) continue;

    graph.at(currentNode.index)?.forEach(edge => {
      // If it's already visited, we've already found the shortest path (thanks to priority queue). Can skip.
      if (visited[edge.to]) return;

      // Otherwise, is this new distance smaller than previously recorded distance?
      const newDistance = distances[currentNode.index] + edge.weight;
      if (newDistance < distances[edge.to]) {
        // If so, mark the previous node and new distance
        previous[edge.to] = currentNode.index;
        distances[edge.to] = newDistance;

        // Insert this cost for getting to this node into the priority queue or update it if it's there
        if (!queue.contains(edge.to)){
          queue.push({index: edge.to, cost: newDistance});
        } else {
          queue.update(edge.to, newDistance);
        }
      }
    })

    // Can we return early?
    // Dijkstra's is greedy, so there shouldn't be shorter paths coming
    // Requires that there are no negative costs on edges
    if (currentNode.index === end) return {distance: distances[end], path: reconstructPath()};
  }
  // We didn't find the node, so it's unreachable
  return {distance: Infinity, path: reconstructPath()};
}

const dijkstrasResult = dijkstras(createWeightedAdjacencyList(), 0, 7);
console.assert(dijkstrasResult.distance == 11);
const expectedPath = [0,1,3,6,7];
console.assert(dijkstrasResult.path.every((value, index) => value === expectedPath[index]));


