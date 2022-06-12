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
// 4 <-> 9 <-> 2 <-> 1 <-> 6 <-> 3 <-> 7
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
// O(N)T | O(n)S
function flattenBinaryTreeBruteForce(root) {
   const nodes = inOrderTraversal(root, []);
   for (let i = 1; i < nodes.length; i++) {
      const [prev, curr] = [nodes[i - 1], nodes[i]];
      console.log(prev?.value, " <-> ", curr?.value);
      prev.right = curr;
      curr.left = prev;
   }
   return nodes[0];
}

function inOrderTraversal(node, array) {
   if (node == null) return array;
   inOrderTraversal(node.left, array);
   array.push(node);
   inOrderTraversal(node.right, array);
   return array;
}

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

// Since tree "root" is changed by ref. you can only pass root to one of these methods
// calling both methods at the same execution will not work.
// flattenBinaryTree(root);
flattenBinaryTreeBruteForce(root);
