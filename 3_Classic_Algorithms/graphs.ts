/**
 * We're creating a directed graph here to explore bridges and articulation points.
 * All nodes are connected somehow.
 * Nodes are entries in the adj array. 
 * Edges are any indexes stored in the array at that index.
 */

export const createGraphForBridgeArticulationPoint = () => {
  // Array is 9 long (for every node). Each element contains an array with the edges.
  const V = 9;
  const adj: number[][] = Array.from({ length: V }, () => []);

  function addEdge(u: number, v: number) {
    adj[u].push(v);
    adj[v].push(u);
  }

  addEdge(0, 1);
  addEdge(0, 2);
  addEdge(1, 2);
  addEdge(2, 3);
  addEdge(3, 4);
  addEdge(2, 5);
  addEdge(5, 6);
  addEdge(6, 7);
  addEdge(7, 8);
  addEdge(8, 5);

  return adj;
}

/**
 * Creates a directed graph for Tarjan's algorithm.
 * The graph is represented as an adjacency list, where each index represents a node and the value at that index is an array of its neighbors.
 * @returns A directed graph with 8 nodes and edges between them.
 */
export const createGraphForTarjans = () => {
  const V = 8;
  const adj: number[][] = Array.from({ length: V }, () => []);

  function addDirectedEdge(u: number, v: number) {
    adj[u].push(v);
  }

  addDirectedEdge(0, 1);
  addDirectedEdge(1, 2);
  addDirectedEdge(2, 0);
  addDirectedEdge(3, 4);
  addDirectedEdge(3, 7);
  addDirectedEdge(4, 5);
  addDirectedEdge(5, 6);
  addDirectedEdge(5, 0);
  addDirectedEdge(6, 4);
  addDirectedEdge(6, 0);
  addDirectedEdge(6, 2);
  addDirectedEdge(7, 3);
  addDirectedEdge(7, 5);

  return adj;
}
