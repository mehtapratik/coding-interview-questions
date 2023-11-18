//
// INSTRUCTIONS
//
// Given a binary tree, determine if it is height-balanced.
//
// A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every
// node never differs by more than one.

//
// EXAMPLES
//
// input(bt):
//          1
//       /     \
//      2       3
//    /    \     \
//   4      5     6
//        /   \
//       8     9
// output: true
//
//
// input(bt):
//          1
//       /     \
//      2       3
//    /    \     \
//   4      5     6
//        /   \
//       8     9
//     /   \
//    10   11
// output: false
//

//
// PREPARATION
//
class TreeNode {
   constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
   }
}

class TreeInfo {
   constructor(isBalanced, height) {
      this.isBalanced = isBalanced;
      this.height = height;
   }
}

//
// CODE
//
function isBalanced(root) {
   return solve(root).isBalanced;
}

function solve(node) {
   if (node == null) {
      return new TreeInfo(true, 0);
   }

   const leftInfo = solve(node.left);
   const rightInfo = solve(node.right);

   if (leftInfo.isBalanced == false || rightInfo.isBalanced == false) {
      return new TreeInfo(false, -1);
   }

   const isBalanced = Math.abs(leftInfo.height - rightInfo.height) <= 1;
   const height = Math.max(leftInfo.height, rightInfo.height) + 1;

   return new TreeInfo(isBalanced, height);
}
