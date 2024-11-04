/**
 * A recursive function to get the sum of any leaf (terminal) nodes.
 */

import { treeOfNumbers } from "./treeOfNumbers.ts";

const sumOfLeaves = (tree: Record<number, number[]>, currentNode: number) => {
  // If it doesn't exist
  if (!tree[currentNode]) return 0;
  // If it has no children, return its value
  if (!tree[currentNode].length) return currentNode;
  
  // Otherwise, return any leaf values from its children
  let total = 0;
  tree[currentNode].forEach(child => {
    total += sumOfLeaves(tree, child);
  })
  return total;
}

// Root node of this tree is 5, which we know.
const result = sumOfLeaves(treeOfNumbers, 5);
console.assert(result === 35);
