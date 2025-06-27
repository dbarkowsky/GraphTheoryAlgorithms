// Max flow should be 23
export const buildFlowGraph = () => {
  // Adjacency list with capacities
  const n = 11;
  const graph: FlowEdge[][] = Array.from({ length: n }, () => []);

  function addDirectedEdge(from: number, to: number, capacity: number) {
    if (capacity <= 0) {
      throw new Error("Capacity must be greater than 0");
    }
    const e1 = new FlowEdge(from, to, capacity);
    const e2 = new FlowEdge(to, from, 0); // Residual edge with 0 capacity
    e1.residual = e2; // Set residual edges
    e2.residual = e1; // Set residual edges in reverse direction
    graph[from].push(e1);
    graph[to].push(e2);
  }

  const sourceIndex = n - 1;
  const sinkIndex = n - 2;

  // From source
  addDirectedEdge(sourceIndex, 0, 10);
  addDirectedEdge(sourceIndex, 1, 5);
  addDirectedEdge(sourceIndex, 2, 10);

  // Middle edges
  addDirectedEdge(0, 3, 10);
  addDirectedEdge(1, 2, 10);
  addDirectedEdge(2, 5, 15);
  addDirectedEdge(3, 1, 2);
  addDirectedEdge(3, 6, 15);
  addDirectedEdge(4, 3, 3);
  addDirectedEdge(4, 1, 15);
  addDirectedEdge(5, 4, 4);
  addDirectedEdge(5, 8, 10);
  addDirectedEdge(6, 7, 10);
  addDirectedEdge(7, 4, 10);
  addDirectedEdge(7, 5, 7);

  // To sink
  addDirectedEdge(6, sinkIndex, 15);
  addDirectedEdge(8, sinkIndex, 10);

  return { graph, sourceIndex, sinkIndex };
}

export class FlowEdge {
  flow: number = 0;
  residual?: FlowEdge; // This set manually outside of class.

  constructor(public from: number, public to: number, public capacity: number) {
    this.from = from;
    this.to = to;
    this.capacity = capacity;
  }

  isResidual(): boolean {
    // Standard edge cannot have capacity of 0, so we can use that to determine if it's a residual edge.
    return this.capacity === 0;
  }

  remainingCapacity(): number {
    return this.capacity - this.flow;
  }

  augmentFlow(bottleNeck: number) {
    if (this.residual) {
      this.flow += bottleNeck;
      this.residual.flow -= bottleNeck;
    } else {
      throw new Error("Residual edge not set for flow augmentation.");
    }
  }
}
