/**
 * To find the centre of a tree structure, we remove the leaves of a tree repeatedly.
 * When there's only 1 (or 2) nodes left, we have our centre.
 * 2 nodes is possible because the tree could have a symmetrical and even number of nodes.
 */

import { treeOfNumbers } from "./treeOfNumbers.ts";

/**
 * Finds the centre nodes of a tree.
 * Nodes in this tree must not have references to their parents.
 * @returns A list of centre nodes.
 */
const findTreeCentre = (tree: Record<number, number[]>) => {
  let treeAsArray = Object.entries(tree);
  // Until we find the centre
  while (treeAsArray.length > 2) {
    // On tree, find all leaves (where there are no edges)
    const leaves: string[] = [];
    treeAsArray.forEach(node => {
      const [key, edges] = node;
      if (edges.length === 0){
        leaves.push(key);
      }
    })
    // Remove leaves from tree
    treeAsArray = treeAsArray.map(node => {
      const [key, edges] = node;
      // Remove leaf/node from tree
      if (leaves.includes(key)){
        return undefined;
      }
      // And remove the references to edges that pointed at that node
      return [key, edges.filter(edge => !leaves.includes(String(edge)))] as [string, number[]];
    }).filter(n => n != undefined); // And clean out the removed nodes
  }
  return treeAsArray;
}

const result = findTreeCentre(treeOfNumbers);
const [key, edges] = result.at(0)!;
console.assert(key === '5');
console.assert(edges.length === 0);

/**
 * Also finds the centre node(s) of a tree.
 * This one expects the tree as a number[] instead.
 * @param tree 
 * @returns 
 */
export const findTreeAsListCentre = (tree: (number[] | undefined)[]) => {
  // Until we find the centre node(s)
  while (tree.filter(node => node != undefined).length > 2) {
    // On tree, find all leaves (where there are no edges)
    const leaves: number[] = [];
    tree.forEach((edges, key) => {
      if (edges){
      if (edges.length === 0){
        leaves.push(key);
      }}
    })
    // Remove edges that point to leaves
    leaves.forEach(leaf => {
      tree = tree.map(nodeEdges => {
        return nodeEdges ? nodeEdges.filter(edge => edge !== leaf) : undefined
      })
      // Remove leaf/node from tree
      tree[leaf] = undefined;
    })
  }
  return tree.filter(node => node != undefined).at(0);
}
const sampleTree1 = [
  [2],
  [],
  [3,4],
  [],
  [1]
]
const result2 = findTreeAsListCentre(sampleTree1)
console.assert(result2?.length === 1)
console.assert(result2?.at(0) === 2)
