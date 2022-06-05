/*
Given the tree and a target number, find a node with closest value to the 
target (absolute difference between node's value and target).

For example:

Tree
                10
            /       \
           5        15
        /    \    /    \
       2     5   13    22
      /            \
      1            14

target = 12

output => 13
*/

// ====================
// PREPRATION
// ====================
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const root = new BST(10);
root.left = new BST(5);
root.left.left = new BST(2);
root.left.left.left = new BST(1);
root.left.right = new BST(5);
root.right = new BST(15);
root.right.left = new BST(13);
root.right.left.right = new BST(14);
root.right.right = new BST(22);

// ====================
// CODE
// ====================

// Approach 1 | Iterative Approach
// Avg Case   | O(log(n))T & O(1)S
// Worst Case | O(n)T & O(1)S
function iterative(tree, target) {
  return findClosest(tree, target, Infinity);

  function findClosest(node, target, closest) {
    let currentNode = node;

    while (currentNode != null) {
      if (Math.abs(target - closest) > Math.abs(target - currentNode.value)) {
        closest = currentNode.value;
      }

      if (target === currentNode.value) {
        break;
      } else if (target < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return closest;
  }
}

// Approach 2 | Recursive Approach
// Avg Case   | O(log(n))T & O(log(n))S
// Worst Case | O(n)T & O(log(n))S
function recursive(tree, target) {
  return findClosest(tree, target, Infinity);

  function findClosest(node, target, closest) {
    if (node == null) return closest;
    if (Math.abs(target - closest) > Math.abs(target - node.value)) {
      closest = node.value;
    }

    if (target === node.value) {
      return closest;
    } else if (target < node.value) {
      return findClosest(node.left, target, closest);
    } else {
      return findClosest(node.right, target, closest);
    }
  }
}

// ====================
// TEST
// ====================

console.log(iterative(root, 12));
console.log(recursive(root, 12));
