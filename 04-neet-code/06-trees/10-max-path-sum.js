//
// INSTRUCTIONS
//
// A path in a binary tree is a sequence of nodes where each pair of adjacent nodes
// in the sequence has an edge connecting them.A node can only appear in the
// sequence at most once.Note that the path does not need to pass through the root.
//
// The path sum of a path is the sum of the node's values in the path.
//
// Given the root of a binary tree, return the maximum path sum of any non-empty path.
//

//
// EXAMPLES
//
// Example 1
// https://assets.leetcode.com/uploads/2020/10/13/exx1.jpg
// Input: root = [1,2,3]
// Output: 6
// Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
//
// Example 2
// https://assets.leetcode.com/uploads/2020/10/13/exx2.jpg
// Input: root = [-10,9,20,null,null,15,7]
// Output: 42
// Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42
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
function maxPathSum(root) {
   let maxSum = -Infinity;
   dfs(root);
   return maxSum;

   function dfs(node) {
      if (node == null) {
         return 0;
      }

      // sum by including left side's max sum + current node
      const leftSum = dfs(node.left) + node.val;
      // sum by including right side's max sum + current node
      const rightSum = dfs(node.right) + node.val;
      // sum by including max of both side's sum + current node
      const allSum = leftSum + rightSum - node.val;

      maxSum = Math.max(maxSum, leftSum, rightSum, allSum, node.val);

      return Math.max(leftSum, rightSum, node.val);
   }
}

//
// TEST
//

// prettier-ignore
const tree = new TreeNode(
   5,
   new TreeNode(3,
      new TreeNode(2,
         new TreeNode(1)
      ),
      new TreeNode(4)
   ),
   new TreeNode(8)
);

console.log(maxPathSum(tree));
