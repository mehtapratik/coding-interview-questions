//
// INSTRUCTIONS
//
// Write a function that takes a valid BST and an integer K.
// It should return Kth largest value from it. Also for the purpose
// of this question, duplicate values in BST will also be treated as
// distinct value. Therefore...
// second largest value in BST containing 5, 7 and 7 will be 7 and NOT 5.

//
// EXAMPLE
//
// input: k = 3
// input: tree
//                    15
//                 /       \
//               5         20
//             /   \      /   \
//            2    5     17   22
//           /  \
//          1   3
// output: 17
//

//
// PREPARATION
//
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

//
// CODE
//

// 1. OPTIMAL APPROACH
// =====================
// O(h + k)T | O(h)S
// You have to go all the way to right of three (h) first and then find kth largest
// node in reverseInOrder fashion. Thefore, time complexity is O(h + k). And since,
// our callstack will reach upto h levels, space complexity is O(h).
function findKthLargestValueInBst(tree, k) {
  reverseInOrderTraversal(tree, k, null);
  return kthLargestValue;
}

function reverseInOrderTraversal(node, k, parent) {
  if (node == null) return;
  reverseInOrderTraversal(node.right, k, node);
  if (visitedNodeCount < k && parent?.value !== node.value) {
    visitedNodeCount += 1;
    kthLargestValue = node.value;
  }
  reverseInOrderTraversal(node.left, k, node);
}

// 1. BRUTE-FORCE APPROACH
// =====================
//O(n)T | O(n)S
function findKthLargestValueInBst_BruteForce(tree, k) {
  let sortedValues = [];
  sortedValues = inOrderTraversal(tree, sortedValues);
  if (sortedValues.length < k) {
    return -1;
  } else {
    return sortedValues[sortedValues.length - k];
  }
}

function inOrderTraversal(node, array) {
  if (node == null) return array;
  array = inOrderTraversal(node.left, array);
  array.push(node.value);
  array = inOrderTraversal(node.right, array);

  return array;
}

//
// TEST
//
const root = new BST(15);
root.left = new BST(5);
root.left.left = new BST(2);
root.left.left.left = new BST(1);
root.left.left.right = new BST(3);
root.left.right = new BST(5);
root.right = new BST(20);
root.right.left = new BST(17);
root.right.right = new BST(22);

console.log(findKthLargestValueInBst(root, 3));
