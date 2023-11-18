//
// INSTRUCTIONS
//
// Given the root of a binary tree, determine if it is a valid binary search tree (BST).
//
// A valid BST is defined as follows:
//
// The left subtree of a node contains only nodes with keys less than the node's key.
// The right subtree of a node contains only nodes with keys greater than the node's key.
// Both the left and right subtrees must also be binary search trees.
//

//
// EXAMPLES
//
// Example 1
// https://assets.leetcode.com/uploads/2020/12/01/tree1.jpg
// Input: root = [2, 1, 3];
// Output: true;
//
// Example 2
// https://assets.leetcode.com/uploads/2020/12/01/tree2.jpg
// Input: root = [5,1,4,null,null,3,6]
// Output: false
// Explanation: The root node's value is 5 but its right child's value is 4.

//
// CODE
//
// Code you will write to solve the asked problem
function solve(root) {
   return dfs(root);
}

function dfs(node, min = Infinity, max = -Infinity) {
   if (node == null) {
      return true;
   }

   if (node.val >= min) {
      return false;
   }

   if (node.val <= max) {
      return false;
   }

   return dfs(node.left, node.val, max) && dfs(node.right, min, node.val);
}
