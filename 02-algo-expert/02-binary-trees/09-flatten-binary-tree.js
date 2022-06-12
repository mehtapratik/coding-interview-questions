//
// INSTRUCTIONS
//
// Write a function that takes a binary tree and flattens it
//
// A flatten tree is structure that is nearly identical to Doubly
// Linked List (except that we've node left and right instead of
// prev and next) where node follow original tree's left-to-right
// order (in-order traversal)
//

//
// EXAMPLE
//
// input (bt):
//          1
//       /     \
//      2       3
//     /      /  \
//    4      6    7
//     \
//      9
//
// output:
// 4 <-> 9  <-> 2 <-> 1 <-> 6 <-> 3 <-> 7
//

//
// PREPARATION
//
class BT {
   constructor(value, left, right) {
      this.value = value;
      this.left = left;
      this.right = right;
   }
}

//
// CODE
//
// O(n)T | O(d)S
function flattenBinaryTree(root) {
   const [l, _] = convertTreeToLinkedList(root);
   return l;
}

function convertTreeToLinkedList(node) {
   let leftSideTree = null;
   let rightSideTree = null;

   if (node.left == null) {
      leftSideTree = node;
   } else {
      const [leftSideLeftSubTree, leftSideRightSubTree] =
         convertTreeToLinkedList(node.left);
      console.log(
         "left side",
         node.value,
         leftSideLeftSubTree.value,
         leftSideRightSubTree.value
      );
      connect(leftSideRightSubTree, node);
      leftSideTree = leftSideLeftSubTree;
   }

   if (node.right == null) {
      rightSideTree = node;
   } else {
      const [rightSideLeftSubTree, rightSideRightSubTree] =
         convertTreeToLinkedList(node.right);
      console.log(
         "right side",
         node.value,
         rightSideLeftSubTree.value,
         rightSideRightSubTree.value
      );
      connect(node, rightSideLeftSubTree);
      rightSideTree = rightSideRightSubTree;
   }

   return [leftSideTree, rightSideTree];
}

function connect(left, right) {
   left.right = right;
   right.left = left;
}

//
// TEST
//
const root = new BT(1);
const two = new BT(2, null, null);
const three = new BT(3, null, null);
const four = new BT(4, null, null);
const nine = new BT(9, null, null);
const six = new BT(6, null, null);
const seven = new BT(7, null, null);

root.left = two;
root.right = three;
two.left = four;
four.right = nine;
three.left = six;
three.right = seven;

flattenBinaryTree(root);
