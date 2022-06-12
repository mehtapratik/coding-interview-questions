//
// INSTRUCTIONS
//
// Write a function that takes binary tree and iterates the nodes in
// "in-order traversal" without using recursion. While iterating the nodes
// it prints those nodes' value in console

//
// EXAMPLE
//
// input(bt):
//          1
//       /     \
//      2       3
//     /      /  \
//    4      6    7
//     \
//      9
//
// output:
// 4
// 9
// 2
// 1
// 6
// 3
// 7
//

//
// PREPARATION
//
class BT {
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
// O(N)T | O(1)S - Choose this method if you're asked to avoid recursion and minimize
// space time complexity
function inOrderIterative(tree) {
   let prevNode = null;
   let currentNode = tree;

   while (currentNode != null) {
      let nextNode = null;

      if (prevNode == null || currentNode.parent === prevNode) {
         // Moving down. As long as prev node is parent of current node,
         // you can assume that we can navigate further down
         if (currentNode.left) {
            nextNode = currentNode.left;
         } else {
            console.log(currentNode.value);
            nextNode = currentNode.right
               ? currentNode.right
               : currentNode.parent;
         }
      } else if (prevNode === currentNode.left) {
         // Moving back up from left side
         console.log(currentNode.value);
         nextNode = currentNode.right ? currentNode.right : currentNode.parent;
      } else {
         // Moving back up from right side
         nextNode = currentNode.parent;
      }

      prevNode = currentNode;
      currentNode = nextNode;
   }
}

//
// TEST
//
const root = new BT(1);
const two = new BT(2, null, null, root);
const three = new BT(3, null, null, root);
const four = new BT(4, null, null, two);
const nine = new BT(9, null, null, four);
const six = new BT(6, null, null, three);
const seven = new BT(7, null, null, three);

root.left = two;
root.right = three;
two.left = four;
four.right = nine;
three.left = six;
three.right = seven;

inOrderIterative(root);
