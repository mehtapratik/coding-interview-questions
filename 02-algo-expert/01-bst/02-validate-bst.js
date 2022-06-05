//
// INSTRUCTIONS
//
// Write a function that takes a potentially invalid binary tree and returns
// true if tree is valid otherwise false

//
// EXAMPLE
//
// input:
//           10
//        /       \
//       5        15
//    /    \    /    \
//   2     5   13    22
//  /            \
//  1            14
//
// output: true
//
// input:
//           10
//        /       \
//       55       15
//    /    \    /    \
//   2     5   13    22
//  /            \
//  1            14
//
// output: false

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

// AVG & WORST CASE   | O(n)T | O(d) S
function validateBst(tree) {
  return validate(tree, -Infinity, Infinity);

  function validate(node, minValue, maxValue) {
    if (node == null) {
      return true;
    }

    if (node.value < minValue || node.value >= maxValue) {
      return false;
    }

    return (
      validate(node.left, minValue, node.value) &&
      validate(node.right, node.value, maxValue)
    );
  }
}

//
// TEST
//

const one = new BST(10);
one.left = new BST(5);
one.left.left = new BST(2);
one.left.left.left = new BST(1);
one.left.right = new BST(5);
one.right = new BST(15);
one.right.left = new BST(13);
one.right.left.right = new BST(14);
one.right.right = new BST(22);

console.log(validateBst(one));

const two = new BST(10);
two.left = new BST(5);
two.left.left = new BST(2);
two.left.left.left = new BST(1);
two.left.right = new BST(12);
two.right = new BST(15);
two.right.left = new BST(13);
two.right.left.right = new BST(14);
two.right.right = new BST(22);

console.log(validateBst(two));
