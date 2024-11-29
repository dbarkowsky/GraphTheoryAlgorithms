/**
 * Priority Queue adjusted from this example:
 * https://stackoverflow.com/questions/42919469/efficient-way-to-implement-priority-queue-in-javascript
 */

const top = 0;

interface QueueNode {
  index: number;
  cost: number;
}

export class PriorityQueue {
  _heap: QueueNode[];
  _comparator;
  constructor(comparator = (a: QueueNode, b: QueueNode) => a.cost > b.cost ? 1 : a.cost < b.cost ? -1 : 0) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  peek() {
    return this._heap[top];
  }
  push(...values: QueueNode[]) {
    values.forEach(value => {
      this._heap.push(value);
    });
    this._sort();
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }
    this._heap.pop();
    this._sort();
    return poppedValue;
  }
  update(key: number, cost: number){
    const itemIndex = this._heap.findIndex((node: QueueNode) => node.index === key);
    if (itemIndex != null){
      this._heap[itemIndex] = {
        ...this._heap[itemIndex],
        cost: cost,
      }
      this._sort();
    }
  }
  contains(key: number) {
    return this._heap.find((node: QueueNode) => node.index === key) != undefined;
  }
  _sort(){
    this._heap = this._heap.sort((a: QueueNode, b: QueueNode) => this._comparator(a, b))
  }
  _swap(i: number, j: number) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
}
