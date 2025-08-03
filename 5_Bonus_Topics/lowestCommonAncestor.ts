import { sparseTable } from "./sparseTable.ts";

// Simple node that knows its index and children
class TreeNode {
  index: number;
  children: TreeNode[];
  constructor(index: number) {
    this.index = index;
    this.children = [];
  }
  addChild(child: TreeNode) {
    this.children.push(child);
  }
}

/**
 * A solution to find the lowest common ancestor (LCA) in a tree.
 * It uses an Eulerian tour to flatten the tree and a sparse table for efficient range queries.
 * The LCA is the deepest node that is an ancestor of all nodes in the query.
 * @param tree 
 * @returns A function to find the LCA of given nodes.
 */
const solveForLCA = (tree: TreeNode[]): (nodeIndexes: number[]) => number => {
  const eulerianTour: number[] = Array(tree.length * 2 - 1); // Tracks order of nodes visited
  const lastOccurrence: number[] = Array(tree.length); // Last time this node was visited
  const depth: number[] = Array(tree.length * 2 - 1); // Depth of each node in the tour
  let tourIndex: number = 0;

  // Visit function to fill the eulerian tour and depth arrays
  const visit = (node: TreeNode, nodeDepth: number) => {
    eulerianTour[tourIndex] = node.index;
    depth[tourIndex] = nodeDepth;
    lastOccurrence[node.index] = tourIndex;
    tourIndex++;
  }

  // Perform a DFS to create the Eulerian tour
  const dfs = (node: TreeNode, nodeDepth = 0) => {
    if (node === null) return; // No mure nodes to visit
    visit(node, nodeDepth);
    for (const child of node.children) {
      dfs(child, nodeDepth + 1);
      // Visit the parent again after visiting the child, because we have to explore the whole tree
      visit(node, nodeDepth); 
    }
  }

  // Start DFS from the root node (assuming tree[0] is the root)
  dfs(tree[0]);
  // Now that the dfs is complete, we can build the sparse table for lookups.
  const minSparseTable = sparseTable(eulerianTour)

  // This will return the LCA of the nodes in the query
  const lca = (nodeIndexes: number[]): number => {
    const left = Math.min(...nodeIndexes.map(index => lastOccurrence[index]));
    const right = Math.max(...nodeIndexes.map(index => lastOccurrence[index]));
    // We use these last occurerences to find the index of the minimum depth in the range
    // This will give us the index in the eulerian tour where the LCA is
    const i = minSparseTable.minIndexQuery(left, right);
    return eulerianTour[i];
  }

  return lca;
}

// Simple tree based on video lesson
const createTree = () => {
  const nodes: TreeNode[] = [];
  for (let i = 0; i < 7; i++) {
    nodes.push(new TreeNode(i));
  }
  nodes[0].addChild(nodes[1]);
  nodes[0].addChild(nodes[2]);
  nodes[1].addChild(nodes[3]);
  nodes[2].addChild(nodes[4]);
  nodes[2].addChild(nodes[5]);
  nodes[4].addChild(nodes[6]);
  return nodes
}


const tree = createTree();
const lca = solveForLCA(tree);
console.assert(lca([1, 2]) === 0)
console.assert(lca([3, 5]) === 0)
console.assert(lca([6, 5]) === 2)
console.assert(lca([2, 2]) === 2)
console.assert(lca([3, 6, 4]) === 0)
console.assert(lca([6, 4, 5]) === 2)
