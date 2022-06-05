//
// INSTRUCTIONS
//
// Given a BST and three nodes - nodeOne, nodeTwo and NodeThree -
// figure out if nodeTwo is in-between nodeOne and nodeThree. Return
// true is yes otherwise, false.
//
// Node 1      Node 3        Node 2
//   |           |             |
// Node 2      Node 2        Node 1
//   |           |             |
// Node 3      Node 1        Node 3
//   =           =             =
//  True        True          False
//

// EXAMPLE
// input (tree)
//                    10
//                 /      \
//               8        15
//             /  \     /   \
//            5   9    12   94
//           /         /    /
//          2         11   81
// input (node1: 11, node2: 15 and node3: 10)
// output: true
// input (node1: 10, node2: 15 and node3: 11)
// output: true
// input (node1: 15, node2: 11 and node3: 10)
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
// O(d)T - where d is distance between nodeOne and nodeThree. In worst case, time complexity
// could be O(h) in scenario where "searchingOne" and "searchingTwo" becomes null before
// reaching nodeTwo or when nodeOne and nodeThree are distributed to the height of tree (i.e
// one node being root node and other being the leaft node)
// O(1)S -Since we're looping and not using any extra space
function validateThreeNodes(nodeOne, nodeTwo, nodeThree) {
  let searchingOne = nodeOne;
  let searchingThree = nodeThree;

  while (true) {
    // reached at the bottom of three and couldn't find nodeTwo
    if (searchingOne == null && searchingThree == null) {
      return false;
    }
    // Found other node before finding nodeTwo
    if (searchingOne === nodeThree || searchingThree === nodeOne) {
      return false;
    }

    // either nodeTwo is descendent of either nodeOne or two
    if (searchingOne === nodeTwo || searchingThree == nodeTwo) {
      break;
    }

    if (searchingOne) {
      searchingOne =
        searchingOne.value > nodeTwo.value
          ? searchingOne.left
          : searchingOne.right;
    }
    if (searchingThree) {
      searchingThree =
        searchingThree.value > nodeTwo.value
          ? searchingThree.left
          : searchingThree.right;
    }
  }

  return isDescendent(nodeTwo, searchingOne === nodeTwo ? nodeThree : nodeOne);
}

function isDescendent(node, target) {
  let currentNode = node;
  while (currentNode) {
    if (currentNode === target) {
      return true;
    }
    currentNode =
      currentNode.value > target.value ? currentNode.left : currentNode.right;
  }

  return false;
}

//
// TEST
//
const root = new BST(5);
root.left = new BST(2);
root.right = new BST(7);
root.left.left = new BST(1);
root.left.right = new BST(4);
root.right.left = new BST(6);
root.right.right = new BST(8);
root.left.left.left = new BST(0);
root.left.right.left = new BST(3);

const nodeOne = root;
const nodeTwo = root.left;
const nodeThree = root.left.right.left;
console.log(validateThreeNodes(nodeOne, nodeTwo, nodeThree));
