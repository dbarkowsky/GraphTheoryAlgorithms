/**
 * We're creating a undirected graph with three groups of nodes.
 * The nodes groups don't have to be complete, just connected somehow.
 * Nodes are entries in the adj array. 
 * Edges are any indexes stored in the array at that index.
 */

export const createGraphWithGroups = () => {
  // Array is 9 long (for every node). Each element contains an array with the edges.
  const V = 9;
  const adj: number[][] = Array.from({ length: V }, () => []);

  function addEdge(u: number, v: number) {
    adj[u].push(v);
    adj[v].push(u);
  }

  // First group is just nodes 0 and 1.
  addEdge(0, 1);

  // Second group is made of nodes 2, 3, 4.
  // It is a complete cycle. (Closed loop)
  addEdge(2, 3);
  addEdge(3, 4);
  addEdge(2, 4);

  // Third group: 5, 6, 7, 8;
  // Not a complete cycle.
  addEdge(5, 6);
  addEdge(5, 7);
  addEdge(7, 8);

  return adj;
}
