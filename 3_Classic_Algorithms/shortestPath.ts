/**
 * Finds the shortest path to every node from the starting node.
 * Starting node is assumed to be the first node from the topological sort
 * Designed only for DAGs
 */

import { topologicalSort } from "./topologicalSort.ts";
import { DagEdge, createWeightedAdjacencyList } from "./trees.ts";

/**
 * Gets shortest paths from starting node
 * @param graph 
 * @returns An array with costs to each node. Based on index. 
 */
const getShortestPaths = (graph: DagEdge[][]) => {
  const topSortedGraph = topologicalSort(graph);
  const distances = Array(graph.length).fill(Infinity);

  distances[0] = 0; // No cost to starting node

  // For each node, get edges and replace distance in array if it's smaller than previously calculated one
  topSortedGraph.forEach(nodeIndex => {
    if (distances[nodeIndex] != null) {
      const edges = graph[nodeIndex];
      edges.forEach((edge: DagEdge) => {
        // Distance is the distance so far plus the cost of the edge
        const newDistance = distances[nodeIndex] + edge.weight;
        distances[edge.to] = Math.min(distances[edge.to], newDistance);
      })
    }
  })
  return distances;
}

const result = getShortestPaths(createWeightedAdjacencyList());
console.assert(result.length == 8);
console.assert(result.at(0) == 0)
console.assert(result.at(-1) == 11)


// What if we want the longest paths?
// Just invert the edge costs and run it again. Invert responses
const invertedGraph = createWeightedAdjacencyList().map(node => node.map(edge => ({ ...edge, weight: edge.weight! * -1 })));
const invertedResult = getShortestPaths(invertedGraph);
const longestPaths = invertedResult.map(distance => distance * -1)
console.log(longestPaths)
