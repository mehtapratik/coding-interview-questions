//
// INSTRUCTIONS
//
// Given the root of a binary tree, return its maximum depth.

// A binary tree's maximum depth is the number of nodes along the longest path from
// the root node down to the farthest leaf node.

//
// EXAMPLES
//
// Example 1:
// https://assets.leetcode.com/uploads/2020/11/26/tmp-tree.jpg
// Input: root = [3,9,20,null,null,15,7]
// Output: 3

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
function maxDepth(root) {
   return bfs(root);
   // return dfs(root, 0);
}

function dfs(node, len) {
   if (node == null) {
      return len;
   }
   return Math.max(dfs(node.left, len + 1), dfs(node.right, len + 1));
}

function bfs(root) {
   if (root == null) return 0;
   const queue = [root];
   let len = 0;

   while (queue.length > 0) {
      const levelLen = queue.length;
      len += 1;
      for (let i = 0; i < levelLen; i++) {
         const node = queue.shift();
         if (node == null) {
            continue;
         }
         if (node.left) {
            queue.push(node.left);
         }
         if (node.right) {
            queue.push(node.right);
         }
      }
   }

   return len;
}

//
// TEST
//
// Console.logs and tests of your algorithm
/*
// Test Case 1
const input1 = "Your input value";
const output1 = yourAlgorithm(input1);
console.log("Test Case 1:", output1);

// Test Case 2
const input2 = "Your input value";
const output2 = yourAlgorithm(input2);
console.log("Test Case 2:", output2);
*/
