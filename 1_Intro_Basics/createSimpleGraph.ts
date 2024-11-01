/**
 * We're creating a undirected graph here of 5 nodes and 5 edges.
 * All nodes are connected somehow.
 * Nodes are entries in the adj array. 
 * Edges are any indexes stored in the array at that index.
 */

export const createSimpleGraph = () => {
  // Array is 5 long (for every node). Each element contains an array with the edges.
  const V = 5;
  const adj: number[][] = Array.from({ length: V }, () => []);

  function addEdge(u: number, v: number) {
    adj[u].push(v);
    adj[v].push(u);
  }

  addEdge(0, 1);
  addEdge(0, 2);
  addEdge(1, 3);
  addEdge(1, 4);
  addEdge(3, 4);

  return adj;
}
