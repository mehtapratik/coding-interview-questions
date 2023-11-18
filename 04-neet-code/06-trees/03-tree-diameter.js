//
// INSTRUCTIONS
//
// Write a function that takes a binary tree and returns its diameter.

//
// EXAMPLE
// input(bst):
//          10
//       /      \
//      20      30
//    /    \
//   40    50
//   /      \
//  80      60
//  /        \
// 90        70
// output: 6
// Explanation: node 20 has biggest diameter (3 nodes on left and 3 on right);

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

class TreeInfo {
   constructor(height, diameter) {
      this.height = height;
      this.diameter = diameter;
   }
}

//
// CODE
//

function binaryTreeDiameter(tree) {
   return getTreeInfo(tree).diameter;
}

function getTreeInfo(node) {
   if (node == null) {
      return new TreeInfo(0, 0);
   }

   const leftInfo = getTreeInfo(node.left);
   const rightInfo = getTreeInfo(node.right);

   // current height will be 1 more of either left's height or right's height, whichever greater
   const height = 1 + Math.max(leftInfo.height, rightInfo.height);

   // this will be diameter of any given node. We don't consider current node
   // as diameter therefore, diameter of following will be just one because
   // left side height 1 and right side is not present
   //     1
   //  2    null
   const currentNodeDiameter = leftInfo.height + rightInfo.height;

   // since we're interested in identifying maximum diameter,
   // find out what was maximum diameter value of children nodes
   // beause it could happen that children node's diameter could be larger
   // than current diameter
   // (e.g.node(20)'s diameter is bugger than node(10) in our example)
   const maxDiameterOfChildren = Math.max(
      leftInfo.diameter,
      rightInfo.diameter
   );

   // now we have current node's diameter and maximum diameter of children
   // node's so far. Take maximum value out of that
   const diameter = Math.max(maxDiameterOfChildren, currentNodeDiameter);

   return new TreeInfo(height, diameter);
}

//
// TEST
//
const tree = new BinaryTree(10);
tree.left = new BinaryTree(20);
tree.right = new BinaryTree(30);
tree.left.left = new BinaryTree(40);
tree.left.left.left = new BinaryTree(80);
tree.left.left.left.left = new BinaryTree(90);
tree.left.right = new BinaryTree(50);
tree.left.right.right = new BinaryTree(60);
tree.left.right.right.right = new BinaryTree(70);

console.log(binaryTreeDiameter(tree));
