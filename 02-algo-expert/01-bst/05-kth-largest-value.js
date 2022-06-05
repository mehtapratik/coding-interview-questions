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
function findKthLargestValueInBst(tree, k) {
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
