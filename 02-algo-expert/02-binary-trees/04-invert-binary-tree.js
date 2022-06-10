//
// INSTRUCTIONS
//
// Write a function that takes a binary tree and inverts it like shown in the example below:

//
// EXAMPLE
// input(bst):
//          10
//       /       \
//      20       30
//    /    \    /    \
//   40    50  60    70
//   /                \
//  80                90
// output(bst):
//          10
//       /       \
//      30       20
//    /    \    /    \
//   70    60  50    40
//   /                \
//  90                80
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
// O(n)T | O(d)S - where n is number of nodes and d is deepest
// depth of tree's branch
function invertBinaryTreeRecursive(tree) {
   if (tree == null) return null;
   invertBinaryTreeRecursive(tree.left);
   invertBinaryTreeRecursive(tree.right);
   const newRight = tree.left;
   tree.left = tree.right;
   tree.right = newRight;

   return tree;
}

// O(n)T | O(n)S - where n is numbe of nodes
function invertBinaryTreeIterative(tree) {
   const deque = [tree]; // imitating deque
   while (deque.length > 0) {
      const node = deque.shift();
      const newRight = node.left;
      node.left = node.right;
      node.right = newRight;
      if (node.left) deque.push(node.left);
      if (node.right) deque.push(node.right);
   }

   return tree;
}

//
// TEST
//

const tree = new BinaryTree(10);
tree.left = new BinaryTree(20);
tree.right = new BinaryTree(30);
tree.left.left = new BinaryTree(40);
tree.left.right = new BinaryTree(50);
tree.right.left = new BinaryTree(60);
tree.right.right = new BinaryTree(70);
tree.left.left.left = new BinaryTree(80);
tree.right.right.right = new BinaryTree(90);

console.log(invertBinaryTreeRecursive(tree));
console.log(invertBinaryTreeIterative(tree));
