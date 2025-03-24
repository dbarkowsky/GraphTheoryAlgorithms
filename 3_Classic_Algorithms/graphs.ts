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
