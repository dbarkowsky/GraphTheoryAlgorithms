import { treeOfNumbers } from "./treeOfNumbers.ts";

const heightOfTree = (tree: Record<number, number[]>, currentNode: number): number => {
  // If node doesn't exist (we should never hit this), return 0
  if (tree[currentNode] == null) return 0;
  // If that is a leaf node, return 1 to indicate it's here
  if (tree[currentNode].length === 0) return 1;
  // Return the max height found from each child of this node
  return Math.max(...tree[currentNode].map(node => heightOfTree(tree, node))) + 1;
}

const result = heightOfTree(treeOfNumbers, 5);
console.assert(result === 4);
