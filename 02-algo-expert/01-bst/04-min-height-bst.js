//
// INSTRUCTIONS
//
// Write a function that takes an array of sorted number and return a BST
// of minimum possible height

//
// EXAMPLE
//
// Input: [1, 2, 5, 7, 10, 13, 14, 15, 22]
// Output:
//
//                 10
//             /       \
//            2         14
//          /  \       /  \
//         1   5      13  15
//              \           \
//              7           22
//
//                OR
//
//                 10
//             /       \
//            5         15
//          /  \       /  \
//         2   7      13  22
//        /            \
//       1             14

//
// PREPARATION
//
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    if (value < this.value) {
      if (this.left === null) {
        this.left = new BST(value);
      } else {
        this.left.insert(value);
      }
    } else {
      if (this.right === null) {
        this.right = new BST(value);
      } else {
        this.right.insert(value);
      }
    }
  }
}

//
// CODE
//
// O(n)T | O(n)S
function minHeightBst(array) {
  return buildTree(array, 0, array.length - 1);

  function buildTree(array, from, to) {
    if (from > to) return null;
    // Remember PEMDAS!!! - Parenthensis -> Exponents -> Multiplication -> Division -> Addition -> Substration
    // That's why you needed parenthesis in addition to avoid division being first than addition
    const midPoint = Math.floor((from + to) / 2);
    const node = new BST(array[midPoint]);
    node.left = buildTree(array, from, midPoint - 1);
    node.right = buildTree(array, midPoint + 1, to);
    return node;
  }
}

//
// TEST
//
console.log(minHeightBst([1, 2, 5, 7, 10, 13, 14, 15, 22]));
