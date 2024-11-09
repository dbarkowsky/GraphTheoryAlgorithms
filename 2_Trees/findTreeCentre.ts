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
