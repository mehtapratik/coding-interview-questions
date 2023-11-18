//
// INSTRUCTIONS
//
// Given the root of a binary tree, invert the tree, and return its root.
//

//
// EXAMPLES
//
// Example 1
// Input: root = [4,2,7,1,3,6,9]
// Output: [4,7,2,9,6,3,1]
//

//
// PREPARATION
//
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

//
// CODE
//
function solve(root) {
   const queue = [root];
   while (queue.length > 0) {
      const node = queue.shift();
      if (node == null) {
         continue;
      }
      [node.left, node.right] = [node.right, node.left];
      queue.push(node.left);
      queue.push(node.right);
   }

   return root;
}
