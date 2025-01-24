/**
 * Bellman-Ford is used when distances from node A to all other nodes are needed
 * but only when there are negative weights on the edges. Dijkstra's will fail here.
 * O(edges * nodes), so bad time complexity.
 */

import { createWeightedAdjacencyListWithNegatives, DagEdge } from "./trees.ts";

const bellmanFord = (adjacencyList: DagEdge[][], startingIndex: number) => {
  // Track all the distances, initialize high
  const distances = Array(adjacencyList.length).fill(Infinity);
  distances[startingIndex] = 0;

  // First set of passes, as many times as there are nodes
  for (let v = 0; v < adjacencyList.length - 1; v++){
    adjacencyList.forEach((node, from) => {
      // Check the edges from each node.
      node.forEach((edge) => {
        // Is there a better (shorter) cost to get to this point? Store it.
        if (distances[from] + edge.weight < distances[edge.to]){
          distances[edge.to] = distances[from] + edge.weight;
        }
      })
    })
  }

  // At this point, we could have distances that are not realistic due to negative cycles.
  // To find these cycles, see if any edges can go lower.
  // They should not be able to without negative loops, so if we find them, mark them.
  for (let v = 0; v < adjacencyList.length - 1; v++){
    adjacencyList.forEach((node, from) => {
      node.forEach((edge) => {
        if (distances[from] + edge.weight < distances[edge.to]){
          distances[edge.to] = -Infinity;
        }
      })
    })
  }

  return distances
}

const result = bellmanFord(createWeightedAdjacencyListWithNegatives(), 0);
console.log(result)
console.assert(result.at(8) == -20)
console.assert(result.reduce((prev, curr) => curr == -Infinity ? prev + 1 : prev, 0) == 4)
