//
// INSTRUCTIONS
//
// Write function to traverse nodes of tree in three different way and return
// the array of nodes' value in that order
//
// InOrder   - Left Node Value -> Current Node Value -> Right Node Value
// PreOrder  - Current Node Value -> Left Node Value -> Right Node Value
// PostOrder - Left Node Value -> Right Node Value -> Curent Node Value
//

//
// EXAMPLE
//
// input:
//           10
//        /       \
//       5        15
//    /    \         \
//   2     5         22
//  /
//  1
// InOrder:     [1 2 5 5 10 15 22] -> goes small to big number
// PreOrder:    [10 5 2 1 5 15 22] -> big to small to big (reverse hill curve)
// PostOrder:   [1 2 5 5 22 15 10] -> small to big to small (hill curve)

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

// O(n)T | O(n)S
function inOrderTraverse(node, array = []) {
  if (node == null) return array;
  inOrderTraverse(node.left, array);
  array.push(node.value);
  inOrderTraverse(node.right, array);
  return array;
}

// O(n)T | O(n)S
function preOrderTraverse(node, array = []) {
  if (node == null) return array;
  array.push(node.value);
  preOrderTraverse(node.left, array);
  preOrderTraverse(node.right, array);
  return array;
}

// O(n)T | O(n)S
function postOrderTraverse(node, array = []) {
  if (node == null) return array;
  postOrderTraverse(node.left, array);
  postOrderTraverse(node.right, array);
  array.push(node.value);
  return array;
}

//
// TEST
//
const root = new BST(10);
root.left = new BST(5);
root.left.left = new BST(2);
root.left.left.left = new BST(1);
root.left.right = new BST(5);
root.right = new BST(15);
root.right.right = new BST(22);

console.log(inOrderTraverse(root));
console.log(preOrderTraverse(root));
console.log(postOrderTraverse(root));
