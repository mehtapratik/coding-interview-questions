//
// INSTRUCTIONS
//
// You have function that takes two argument
// 1. a binary tree where nodes have an additional pointer to their parent
// 2. possibily one of the node from that tree as target
// Return the successor node of the target node from that tree; return null if you can't find it.
// Successor node is immediately next node where traversed in-order (left -> current -> right)

//
// EXAMPLE
//
/*
input(bst):
                 50
             /        \
            40        60
         /     \    /    \
        35     45  55    65
        /                 \
       30                 67
input(target): 35
output: 40
in order traversal = [30, 35, 40, 45, 50, 55, 60, 65, 67]
*/

//
// PREPARATION
//
class Tree {
   constructor(value, left, right, parent) {
      this.value = value;
      this.left = left;
      this.right = right;
      this.parent = parent;
   }
}

//
// CODE
//

//O(h)T | O(1)S
function findSuccessorWithParent(tree, target) {
   if (target.right) {
      return findLeftMostChild(target.right);
   }

   return findNonvisitedParent(target);

   function findLeftMostChild(node) {
      let currentNode = node;
      while (currentNode.left) {
         currentNode = currentNode.left;
      }

      return currentNode;
   }

   function findNonvisitedParent(node) {
      let currentNode = node;
      while (
         currentNode.parent != null &&
         currentNode.parent.right === currentNode
      ) {
         currentNode = currentNode.parent;
      }

      return currentNode.parent;
   }
}

//O(N)T | O(N)S
function findSuccessorWithoutParent(tree, target) {
   let found = false;
   let successor = null;

   function inOrderLookup(node, target) {
      if (node == null || successor) return;

      inOrderLookup(node.left, target);
      if (node.value === target.value) {
         found = true;
      }

      if (found && successor == null && node.value !== target.value) {
         successor = node;
      }

      inOrderLookup(node.right, target);
   }

   inOrderLookup(tree, target);
   return successor;
}

//O(N)T | O(N)S
function findSuccessorWithoutParent2(tree, target) {
   function inOrderTraversal(node, array = []) {
      if (node == null) {
         return array;
      }

      inOrderTraversal(node.left, array);
      array.push(node);
      inOrderTraversal(node.right, array);
      return array;
   }

   const inOrderNodes = inOrderTraversal(tree, []);
   for (let i = 0; i < inOrderNodes.length; i++) {
      if (inOrderNodes[i].value !== target.value) continue;
      return inOrderNodes[i + 1];
   }
}

//
// TEST
//
const tree = new Tree(50);
tree.left = new Tree(40, null, null, tree);
tree.right = new Tree(60, null, null, tree);
tree.left.left = new Tree(35, null, null, tree.left);
tree.left.left.left = new Tree(30, null, null, tree.left.left);
tree.left.right = new Tree(45, null, null, tree.left);
tree.right.left = new Tree(55, null, null, tree.right);
tree.right.right = new Tree(65, null, null, tree.right);
tree.right.right.right = new Tree(67, null, null, tree.right.right);

console.log("Finding successor with help of parent...");
console.log(findSuccessorWithParent(tree, tree.left.right)?.value === 50);
console.log(
   findSuccessorWithParent(tree, tree.right.right.right)?.value == null
);
console.log(findSuccessorWithoutParent(tree, tree.left)?.value === 45);
console.log(findSuccessorWithoutParent(tree, tree.right.right)?.value === 67);
console.log(
   findSuccessorWithoutParent(tree, tree.left.left.left)?.value === 35
);
console.log(findSuccessorWithoutParent(tree, tree.right)?.value === 65);

console.log("Finding successor without the help of parent...");
console.log(findSuccessorWithoutParent(tree, tree.left.right)?.value === 50);
console.log(
   findSuccessorWithoutParent(tree, tree.right.right.right)?.value == null
);
console.log(findSuccessorWithoutParent(tree, tree.left)?.value === 45);
console.log(findSuccessorWithoutParent(tree, tree.right.right)?.value === 67);
console.log(
   findSuccessorWithoutParent(tree, tree.left.left.left)?.value === 35
);
console.log(findSuccessorWithoutParent(tree, tree.right)?.value === 65);

console.log("Finding successor without the help of parent (second method)...");
console.log(findSuccessorWithoutParent2(tree, tree.left.right)?.value === 50);
console.log(
   findSuccessorWithoutParent2(tree, tree.right.right.right)?.value == null
);
console.log(findSuccessorWithoutParent2(tree, tree.left)?.value === 45);
console.log(findSuccessorWithoutParent2(tree, tree.right.right)?.value === 67);
console.log(
   findSuccessorWithoutParent2(tree, tree.left.left.left)?.value === 35
);
console.log(findSuccessorWithoutParent2(tree, tree.right)?.value === 65);
