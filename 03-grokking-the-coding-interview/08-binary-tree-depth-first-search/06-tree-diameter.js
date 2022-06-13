//
// INSTRUCTIONS
//
// Given a binary tree, find the length of its diameter. The diameter of a tree is the number
// of nodes on the longest path between any two leaf nodes.The diameter of a tree may or may
// not pass through the root.

// Note: You can always assume that there are at least two leaf nodes in the given tree.
//

//
// EXAMPLE
//
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
// output: 7
// Explanation: node 20 has biggest diameter (3 nodes on left and 3 on right + 1 for self);
//

//
// PREPARATION
//
class TreeNode {
   constructor(value, left, right) {
      this.value = value;
      this.left = left;
      this.right = right;
   }
}

//
// CODE
//
class TreeInfo {
   constructor(height, diameter) {
      this.height = height;
      this.diameter = diameter;
   }
}

// Following approach assumes that given tree diameter doesn't have to have
// nodes on either side. In other words, max diameter can be with all nodes
// on either side of the tree.
// O(n)T
// O(n)S          Worst case, if tree is skewed like linked list
// O(log(n))S     Average case when tree is balanced
function getTreeDiameter(root) {
   const treeInfo = getTreeInfo(root);
   return treeInfo.diameter || 0;
}

function getTreeInfo(currentNode) {
   if (currentNode == null) {
      return new TreeInfo(0, 0);
   }

   const leftSideInfo = getTreeInfo(currentNode.left);
   const rightSideInfo = getTreeInfo(currentNode.right);

   const currentNodeDiameter = leftSideInfo.height + rightSideInfo.height + 1;
   const maxDiameterSoFar = Math.max(
      leftSideInfo.diameter,
      rightSideInfo.diameter
   );
   const diameter = Math.max(currentNodeDiameter, maxDiameterSoFar);
   const height = 1 + Math.max(leftSideInfo.height, rightSideInfo.height);
   console.log(
      `Node ${currentNode.value}'s height is ${height} and diameter is ${diameter}.`
   );
   return new TreeInfo(height, diameter);
}

// Following approach assumes that given tree diameter have to have
// at least one node on either side. In other words, you cannot have
// diameter with all nodes on just one side of the tree
// O(n)T
// O(n)S          Worst case, if tree is skewed like linked list
// O(log(n))S     Average case when tree is balanced

function getTreeDiameter2(root) {
   const treeInfo = getTreeInfo2(root);
   return treeInfo.diameter || 0;
}

function getTreeInfo2(currentNode) {
   if (currentNode == null) {
      return new TreeInfo(0, 0);
   }

   const leftSideInfo = getTreeInfo(currentNode.left);
   const rightSideInfo = getTreeInfo(currentNode.right);

   let diameter = 0;
   // we want at least one node on either side to calculate diameter
   // i.e. diameter cannot be skewed - all nodes only on either side
   if (leftSideInfo.height > 0 && rightSideInfo.height > 0) {
      const currentNodeDiameter =
         leftSideInfo.height + rightSideInfo.height + 1;
      const maxDiameterSoFar = Math.max(
         leftSideInfo.diameter,
         rightSideInfo.diameter
      );
      diameter = Math.max(currentNodeDiameter, maxDiameterSoFar);
   }

   const height = 1 + Math.max(leftSideInfo.height, rightSideInfo.height);
   console.log(
      `Node ${currentNode.value}'s height is ${height} and diameter is ${diameter}.`
   );
   return new TreeInfo(height, diameter);
}

//
// TEST
//
const root = new TreeNode(
   10,
   new TreeNode(
      20,
      new TreeNode(40, new TreeNode(80, new TreeNode(90))),
      new TreeNode(50, new TreeNode(60, new TreeNode(70)))
   ),
   new TreeNode(30)
);

console.log(getTreeDiameter(root));
console.log(getTreeDiameter2(root));
