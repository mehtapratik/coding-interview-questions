//
// INSTRUCTIONS
//
// Write a function that takes in a binary tree and returns its max path sum.

//
// EXAMPLE
//
// input(bt):
//          1
//       /     \
//      2       3
//    /   \   /  \
//   4     5 6    7
//
// output: 18 [5 + 2 + 1 + 3 + 7]
// Explanation: You should be able to draw a straight line though the root
// Negative values can be present in node. In that case, even a single root, mid or leaf node
// can also be considered as an entire path for max sum. For example:
//          1
//      -5     2
//    6
// Here the node  6 is maxpath sum.
//
// It's important to point out that we are looking for the maximum path. In the most simple case,
// a single node can be the max path, or even the entire tree could be the max path.To keep the
// max variable up to date, I create a global variable that will be updated over the run of
// the functions.
//
// We are doing a DFS recursive function here.
//
// We need a base case, and that base case is if we hit a null, we return 0. We are going going
// to finish the left subtree before going to the right subtree, which is denoted by
// findSums(node.left) then after is findSums(node.right).After the left and right subtree
// are done(for an example, look at a single node), we have three different sums.All three
// nodes(left, right and node.val), left side(node.val and left), right side(node.val and right)
// or just the single node.We use these values(with the current max) to find the max.

// The most important part is what do we return for this recursive function?
// The answer is we are returning "The Max Path from this node"

// That can be node.val, leftNodeSum, or rightNodeSum.
// We cannot return allSum since that would not be a path.
// Very, very important to point that out.

//
// PREPARATION
//
class BinaryTree {
   constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
   }
}

//
// CODE
//
// O(n)T | O(log(n))S - n is number of nodes in tree
function maxPathSum(tree) {
   let maxPathSum = -Infinity;

   function maxPath(node) {
      // Base condition
      if (node == null) return 0;

      const left = maxPath(node.left);
      const right = maxPath(node.right);

      // Either or both, left and right, can be negative
      // resulting into smaller sum than node's actual value
      const allSum = left + right + node.value;
      const leftSum = left + node.value;
      const rightSum = right + node.value;

      // Since left, right or node's value itself can be negative, we have to take
      // the max value from all these five variables
      maxPathSum = Math.max(maxPathSum, allSum, leftSum, rightSum, node.value);

      // when you pass the value further up the tree, make sure you pass
      // maximum of these three values (this is because of negative
      // value in either of these three places)
      return Math.max(left, right, node.value);
   }

   maxPath(tree);

   return maxPathSum;
}

//
// TEST
//
const tree = new BinaryTree(1);
tree.left = new BinaryTree(2);
tree.right = new BinaryTree(3);
tree.left.left = new BinaryTree(4);
tree.left.right = new BinaryTree(5);
tree.right.left = new BinaryTree(6);
tree.right.right = new BinaryTree(7);

console.log(maxPathSum(tree));
