//
// INSTRUCTIONS
//
// Write a function that takes a binary tree and inverts it like shown in the example below:

//
// EXAMPLE
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
function heightBalancedBinaryTree(tree) {
   return getTreeHeightAndBalance(tree).isBalanced;
}

function getTreeHeightAndBalance(node) {
   if (node == null) return { height: 0, isBalanced: true };

   const leftInfo = getTreeHeightAndBalance(node.left);
   const rightInfo = getTreeHeightAndBalance(node.right);

   const isBalanced =
      leftInfo.isBalanced &&
      rightInfo.isBalanced &&
      Math.abs(leftInfo.height - rightInfo.height) <= 1;

   const height = 1 + Math.max(leftInfo.height, rightInfo.height);

   return { height, isBalanced };
}

//
// TEST
//
const tree = new BinaryTree(1);
tree.left = new BinaryTree(2);
tree.right = new BinaryTree(3);
tree.left.left = new BinaryTree(4);
tree.left.right = new BinaryTree(5);
tree.left.right.left = new BinaryTree(8);
tree.left.right.right = new BinaryTree(9);
tree.right.right = new BinaryTree(6);

console.log(heightBalancedBinaryTree(tree));

tree.right.right.right = new BinaryTree(80);
console.log(heightBalancedBinaryTree(tree));
