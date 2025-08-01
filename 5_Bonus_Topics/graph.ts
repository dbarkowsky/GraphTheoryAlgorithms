export class WeightedEdge {
  constructor(public from: number, public to: number, public weight: number) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}

/**
 * Builds a 2D array with weighted edge values. 
 * Each index of the top array is a node.
 */
export const createMinimumSpanningTreeGraph = () => {
  const graph = Array(8);
  for (let i = 0; i < graph.length; i++) {
    graph[i] = [];
  }

  // We add both directions because we treat these edges a bi-directional.
  const addEdge = (from: number, to: number, weight: number) => {
    graph[from].push({
      from,
      to,
      weight
    } as WeightedEdge);
    // And a reverse edge
    graph[to].push({
      from: to,
      to: from,
      weight
    } as WeightedEdge);
  }

  addEdge(0, 1, 10)
  addEdge(0, 2, 1)
  addEdge(0, 3, 4)

  addEdge(1, 2, 3)
  addEdge(1, 4, 0)

  addEdge(2, 3, 2)
  addEdge(2, 5, 8)

  addEdge(3, 5, 2)
  addEdge(3, 6, 7)

  addEdge(4, 5, 1)
  addEdge(4, 7, 8)

  addEdge(5, 6, 6)
  addEdge(5, 7, 9)

  addEdge(6, 7, 12)

  return graph;
}
