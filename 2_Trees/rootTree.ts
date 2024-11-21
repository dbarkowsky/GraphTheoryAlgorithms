/**
 * This function starts at any given node in a tree and
 * rebuilds the tree around that root. 
 * Conveys parent-child relationships where there were undirected edges before.
 */
import { treeOfNumbersWithParents } from "./treeOfNumbers.ts";

// A tree node
export class TreeNode {
  id: number;
  parent: TreeNode | undefined;
  children: TreeNode[];
  constructor(id: number, parent?: TreeNode , children: TreeNode[] = []) {
    this.id = id;
    this.parent = parent;
    this.children = children
  }
}

export const rootTree = (tree: Record<number, number[]>, startingId: number) => {
  const root = new TreeNode(startingId);
  return buildTree(tree, root);
}

// Recursive function to build tree
const buildTree = (tree: Record<number, number[]>, currentNode: TreeNode, parent?: TreeNode) => {
  // For each neighbour of any given node
  tree[currentNode.id].forEach(neighbour => {
    // if it has a parent and this neighbour is also that parent, just leave
    if (parent && neighbour == parent.id) return;
    // Otherwise, this is a new child, with the current node as its parent
    const newChild = new TreeNode(neighbour, currentNode, []);
    currentNode.children.push(newChild);
    // Continue along, building the tree
    buildTree(tree, newChild, currentNode);
  })
  // In the end, we essentially just return an updated node,
  // but now with edges
  return currentNode;
}

// We start at the node with value 3 this time.
// It's a little unbalanced, but it shows that the function
// remade the tree with 3 as the root.
const result = rootTree(treeOfNumbersWithParents, 3);
console.assert(result.id === 3)
// Should have 3 children
console.assert(result.children.length === 3)
// But no parent
console.assert(result.parent == null)
