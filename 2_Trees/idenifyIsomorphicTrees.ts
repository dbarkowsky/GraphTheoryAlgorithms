/**
 * Isomorphic Trees are ones that have identical structures.
 * e.g. A pentagram and a pentagon have the same nodes/edges, just different shape.
 * Check if they have the same structure by simplifying to a binary representation.
 */

import { findTreeAsListCentre } from "./findTreeCentre.ts";
import { rootTree, TreeNode } from "./rootTree.ts";

// Some simple trees. No reference to parent.
const sampleTree1 = [
  [2],
  [],
  [3,4],
  [],
  [1]
]

const sampleTree2 = [
  [1],
  [2,3],
  [4],
  [],
  []
]

/**
 * Are these two trees isomorphic (same structure)?
 * Find their centres to get their roots, then encode and compare.
 * @param tree1 
 * @param tree2 
 * @returns 
 */
const areTreesIsomorphic = (tree1: number[][], tree2: number[][]) => {
  // Can't work if one tree is empty
  if (!tree1.length || !tree2.length) return false;
  // Find the centre of each tree. Tree 1 -> Pick one if multiple. Tree 2 -> get all.
  const tree1Centre = findTreeAsListCentre(sampleTree1)?.at(0)!;
  const tree2Centres = findTreeAsListCentre(sampleTree2);
  // Root tree 1 from this centre node
  const tree1Root: TreeNode = rootTree(sampleTree1, tree1Centre)
  // Encode it to binary representation
  const tree1Encoding = encode(tree1Root);

  // If any of the tree 2 centres can be used as the root 
  // and the structure matches tree 1, they are isomorphic.
  return tree2Centres?.some(centre => {
    const root = rootTree(sampleTree2, centre);
    const encoding = encode(root);
    return tree1Encoding.localeCompare(encoding) === 0
  })
}

/**
 * Breaks tree down to binary representation using () symbols.
 * Tree must be sorted so that the left side of every parent-child relationship is heavier.
 * Recursive function. Just feed it the root of the tree to start.
 * @param tree 
 * @returns 
 */
const encode = (tree: TreeNode): string => {
  if (tree == null) return "";

  const labels: string[] = [];
  tree.children.forEach(child => {
    labels.push(encode(child));
  })
  labels.sort((a, b) => a.localeCompare(b));
  return `(${labels.join("")})`;
}

const result = areTreesIsomorphic(sampleTree1, sampleTree2);
console.assert(result)
