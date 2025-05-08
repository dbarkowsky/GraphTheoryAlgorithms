/**
 * These functions find the bridges and articulation points in a graph.
 * Bridges are edges that when separated would sever the graph into two or more subgraphs.
 * Articulation points are nodes that when removed would sever the graph into two or more subgraphs.
 */
import { createGraphForBridgeArticulationPoint } from "./graphs.ts"

interface Bridge {
  from: number;
  to: number;
}

/**
 * 
 * @param graph An adjacency list representation of a graph
 * @returns An array of bridges with the from and to indexes from the graph
 */
const findBridges = (graph: number[][]) => {
  let currentId = 0;
  const lowLink = Array(graph.length).fill(undefined); // The lowest id reachable from the node
  const ids = Array(graph.length).fill(undefined);
  const visited = Array(graph.length).fill(false);
  const bridges: Bridge[] = []

  // Depth first search. Trying to identify the lowlink value and add to bridges array if needed.
  const dfs = (at: number, parent: number) => {
    // Mark this node as visited.
    visited[at] = true;
    // Its lowlink id is initialized as its current id.
    lowLink[at] = currentId;
    ids[at] = currentId;
    currentId++;

    // For each neighbor of the current node
    graph.at(at)?.forEach((to: number) => {
      // Skip the parent node
      if (to === parent) return;
      // If the neighbor hasn't been visited yet, visit it.
      if (!visited[to]) {
        // Recursive dfs call
        dfs(to, at);
        // Now that we've explored that depth to its fullest, what's the lowest node it can reach?
        // This will either be its own lowlink value or its next neighbor's lowlink value.
        lowLink[at] = Math.min(lowLink[at], lowLink[to]);
        // If the current node's id is less than the neighbor's lowlink value, then this is a bridge.
        if (ids[at] < lowLink[to]) {
          bridges.push({ from: at, to: to });
        }
      } else {
        // If the neighbor has been visited, then we can update the current node's lowlink value to the neighbor's id.
        lowLink[at] = Math.min(lowLink[at], ids[to]);
      }
    })
  }

  // for each node in the graph, run dfs if not visited.
  for (let i = 0; i < graph.length; i++) {
    if (!visited[i]) {
      dfs(i, -1);
    }
  }
  return bridges;
}

const result = findBridges(createGraphForBridgeArticulationPoint());
console.assert(result.length == 3);

/**
 * 
 * @param graph Adjacency list representation of a graph
 * @returns List of booleans. Their index position indicates the node in the graph. True indicates that the node is an articulation point.
 */
const findArticulationPoints = (graph: number[][]) => {
  let currentId = 0;
  const lowLink = Array(graph.length).fill(undefined);
  const ids = Array(graph.length).fill(undefined);
  const visited = Array(graph.length).fill(false);
  const isArticulationPoint = Array(graph.length).fill(false);

  let rootNodeOutgoingEdges = 0;

  const dfs = (at: number, parent: number, root: number) => {
    // If we're at the root node, increment the number of outgoing edges.
    if (parent === root) rootNodeOutgoingEdges++;
    // Mark this node as visited.
    visited[at] = true;
    // Its lowlink id is initialized as its current id.
    lowLink[at] = currentId;
    ids[at] = currentId;
    currentId++;

    graph.at(at)?.forEach((to: number) => {
      if (to === parent) return;
      if (!visited[to]) {
        dfs(to, at, root);
        lowLink[at] = Math.min(lowLink[at], lowLink[to]);
        // This is an articulation point if the current node's id is less or equal than the neighbor's lowlink value.
        if (ids[at] <= lowLink[to]) {
          isArticulationPoint[at] = true;
        }
      } else {
        lowLink[at] = Math.min(lowLink[at], ids[to]);
      }
    })
  }

  // For each node, run dfs and track outgoing edges
  // Mark as articulation point if there's more than one outgoing edge
  for (let i = 0; i < graph.length; i++) {
    if (!visited[i]) {
      rootNodeOutgoingEdges = 0;
      dfs(i, -1, i);
      isArticulationPoint[i] = rootNodeOutgoingEdges > 1;
    }
  }
  return isArticulationPoint;
}

const result2 = findArticulationPoints(createGraphForBridgeArticulationPoint());
console.assert(result2[2] == true);
console.assert(result2[3] == true);
console.assert(result2[5] == true);
