//
// INSTRUCTIONS
//
// Given the root of a binary tree, return the level order traversal of its nodes' values.
// (i.e., from left to right, level by level).
//

//
// EXAMPLES
//
// https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg
// Input: root = [3, 9, 20, null, null, 15, 7];
// Output: [[3], [9, 20], [15, 7]];
//

//
// PREPARATION
//
class TreeNode {
   constructor(value, left, right) {
      this.val = value;
      this.left = left;
      this.right = right;
   }
}

//
// CODE
//
function solve(root) {
   if (root == null) return [];
   const queue = [root];
   const order = [];
   while (queue.length > 0) {
      const len = queue.length;
      const level = [];
      for (let i = 0; i < len; i++) {
         const node = queue.shift();
         level.push(node.val);
         if (node.left) queue.push(node.left);
         if (node.right) queue.push(node.right);
      }
      order.push(level);
   }

   return order;
}

//
// TEST
//
const tree = new TreeNode(7, new TreeNode(5, p, q), new TreeNode(8));
console.log(solve(tree));
