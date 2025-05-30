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

/**
 * Creates a weighted directed graph for the Travelling Salesman Problem (TSP).
 * The graph is represented as an adjacency list, where each index represents a node and the value at that index is an array of its neighbors.
 */
export const createGraphForTravellingSalesman = () => {
  const V = 8;
  const adj: {
    nodeId: number;
    weight: number
  }[][] = Array.from({ length: V }, () => []);

  function addWeightedEdge(u: number, v: number, weight: number) {
    adj[u].push({ nodeId: v, weight });
    adj[v].push({ nodeId: u, weight }); // Assuming undirected graph for TSP
  }

  function addInfinityEdge(u: number) {
    adj[u].splice(u, 0, { nodeId: u, weight: Infinity });
  }

  addWeightedEdge(0, 1, 10);
  addWeightedEdge(0, 2, 15);
  addWeightedEdge(0, 3, 20);
  addWeightedEdge(0, 4, 25);
  addWeightedEdge(0, 5, 30);
  addWeightedEdge(0, 6, 35);
  addWeightedEdge(0, 7, 40);

  addWeightedEdge(1, 2, 14);
  addWeightedEdge(1, 3, 18);
  addWeightedEdge(1, 4, 22);
  addWeightedEdge(1, 5, 26);
  addWeightedEdge(1, 6, 32);
  addWeightedEdge(1, 7, 38);

  addWeightedEdge(2, 3, 16);
  addWeightedEdge(2, 4, 21);
  addWeightedEdge(2, 5, 27);
  addWeightedEdge(2, 6, 33);
  addWeightedEdge(2, 7, 39);

  addWeightedEdge(3, 4, 19);
  addWeightedEdge(3, 5, 24);
  addWeightedEdge(3, 6, 28);
  addWeightedEdge(3, 7, 34);

  addWeightedEdge(4, 5, 17);
  addWeightedEdge(4, 6, 23);
  addWeightedEdge(4, 7, 29);

  addWeightedEdge(5, 6, 31);
  addWeightedEdge(5, 7, 37);

  addWeightedEdge(6, 7, 43);

  // Add infinity edges to simulate unreachable nodes
  addInfinityEdge(0);
  addInfinityEdge(1);
  addInfinityEdge(2);
  addInfinityEdge(3);
  addInfinityEdge(4);
  addInfinityEdge(5);
  addInfinityEdge(6);
  addInfinityEdge(7);
  return adj;
}

/**
 * Creates a directed graph for Eulerian Path algorithm.
 * The graph is represented as an adjacency list, where each index represents a node and the value at that index is an array of its neighbors.
 * @returns A directed graph with 6 nodes and edges between them.
 */
export const createGraphForEulerian = () => {
  const V = 6;
  const adj: number[][] = Array.from({ length: V }, () => []);

  function addDirectedEdge(u: number, v: number) {
    adj[u].push(v);
  }

  addDirectedEdge(0, 1);
  addDirectedEdge(0, 2);
  addDirectedEdge(1, 1);
  addDirectedEdge(1, 3);
  addDirectedEdge(1, 3);
  addDirectedEdge(2, 0);
  addDirectedEdge(2, 1);
  addDirectedEdge(2, 4);
  addDirectedEdge(3, 2);
  addDirectedEdge(3, 5);
  addDirectedEdge(4, 5);
  addDirectedEdge(5, 2);

  return adj;
}
