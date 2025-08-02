import { WeightedEdge } from "./graph.ts";

/**
 * IndexedPriorityQueue is a priority queue that allows for efficient updates of edge weights.
 * It uses a min-heap structure to always return the edge with the lowest weight.
 * The queue supports operations like enqueue, dequeue, contains, and decreaseKey.
 */
export class IndexedPriorityQueue {
  // This stores the actual edges in a min-heap structure.
  private heap: WeightedEdge[] = [];
  // This maps node indices to their position in the heap for quick access.
  // Key is the node index, value is the index in the heap.
  private nodePosition: Map<number, number> = new Map();

  // Swaps two edges in the heap and updates their positions in the nodePosition map.
  private swap(i: number, j: number) {
    const edgeI = this.heap[i];
    const edgeJ = this.heap[j];

    this.nodePosition.set(edgeI.to, j);
    this.nodePosition.set(edgeJ.to, i);

    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  /**
   * In a min-heap, the parent must have a weight less than or equal to its children.
   * To keep this true after enqueuing or decreasing a key, we need to bubble up or down.
   * - `heapifyUp` is used when we add a new edge or decrease the key of an existing edge.
   * - `heapifyDown` is used when we remove the minimum edge (the root of the heap).
   * This ensures that the heap property is maintained after any operation that modifies the heap.
   */

  // Moves an edge up in the heap to maintain the min-heap property.
  // It is called when a new edge is added or an existing edge's weight is decreased
  private heapifyUp(index: number) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2); // Because this is stored in an array.
      if (this.heap[index].weight >= this.heap[parent].weight) break;
      this.swap(index, parent);
      index = parent;
    }
  }

  // Moves an edge down in the heap to maintain the min-heap property.
  // It is called when the minimum edge is removed from the heap.
  private heapifyDown(index: number) {
    const n = this.heap.length;
    while (true) {
      let smallest = index;
      // Calculate the indices of the left and right children. Remember that this is a binary heap in an array.
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      // Find the smallest edge among the current node and its children.
      if (left < n && this.heap[left].weight < this.heap[smallest].weight) {
        smallest = left;
      }
      if (right < n && this.heap[right].weight < this.heap[smallest].weight) {
        smallest = right;
      }

      if (smallest === index) break; // The heap property is satisfied, no need to swap.

      this.swap(index, smallest);
      index = smallest;
    }
  }

  // Adds or updates an edge in the priority queue.
  enqueue(edge: WeightedEdge) {
    // If the edge already exists, we decrease its key.
    if (this.contains(edge.to)) {
      this.decreaseKey(edge.to, edge);
    } else {
      // Otherwise, we add it to the heap.
      this.heap.push(edge);
      const index = this.heap.length - 1;
      this.nodePosition.set(edge.to, index);
      this.heapifyUp(index);
    }
  }

  // Removes and returns the edge with the lowest weight.
  dequeue(): WeightedEdge | undefined {
    if (this.heap.length === 0) return undefined;

    // Remove the minimum edge (the root of the heap).
    const minEdge = this.heap[0];
    const last = this.heap.pop()!;
    this.nodePosition.delete(minEdge.to);

    // If there are still elements in the heap, move the last element to the root and heapify down.
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.nodePosition.set(last.to, 0);
      this.heapifyDown(0);
    }

    return minEdge;
  }

  // Checks if the priority queue contains a node. (checks map)
  contains(nodeIndex: number): boolean {
    return this.nodePosition.has(nodeIndex);
  }

  // Decreases the key of a node in the priority queue.
  // This is used to update the weight of an edge if a cheaper one is found.
  decreaseKey(node: number, newEdge: WeightedEdge) {
    if (!this.contains(node)) return;

    const index = this.nodePosition.get(node)!;
    const currentEdge = this.heap[index];

    if (newEdge.weight >= currentEdge.weight) return; // Only decrease allowed

    this.heap[index] = newEdge;
    this.nodePosition.set(node, index);
    this.heapifyUp(index);
  }

  size(): number {
    return this.heap.length;
  }
}
