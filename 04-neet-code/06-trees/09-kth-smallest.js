//
// INSTRUCTIONS
//
// Given the root of a binary search tree, and an integer k, return the kth
// smallest value(1 - indexed) of all the values of the nodes in the tree.
//

//
// EXAMPLES
//
// Example 1
// https://assets.leetcode.com/uploads/2021/01/28/kthtree1.jpg
// Input: root = [3,1,4,null,2], k = 1
// Output: 1
//
// Example 2
// https://assets.leetcode.com/uploads/2021/01/28/kthtree2.jpg
// Input: root = [5,3,6,2,4,null,null,1], k = 3
// Output: 3
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
function kthSmallest(root, k) {
   let visitedNodeCount = 0;
   let kthSmallestValue = 0;
   return inOrderTraversal(root, k);

   function inOrderTraversal(node, k) {
      if (node == null || visitedNodeCount >= k) {
         return kthSmallestValue;
      }

      inOrderTraversal(node.left, k);

      if (visitedNodeCount < k) {
         visitedNodeCount += 1;
         kthSmallestValue = node.val;
      }

      inOrderTraversal(node.right, k);

      return kthSmallestValue;
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

console.log(kthSmallest(tree, 6));
