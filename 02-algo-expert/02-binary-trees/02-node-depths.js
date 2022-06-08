//
// INSTRUCTIONS
//
// Distance between node's root is called its depth. Write a function that takes each
// node's depth and returns its sum

//
// EXAMPLE
//
// input:
//                    1
//              /           \
//             2             3
//          /    \        /     \
//         4      5      6       7
//       /   \   /
//      8    9  10
// output: 16
// depth of node(2) is 1
// depth of node(3) is 1
// depth of node(4) is 2
// ...
// sum of all depths is 16
//
class BinaryTree {
   constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
   }
}

//
// PREPARATION
//

//
// CODE
//
// O(n)T | O(h)S
// O(h)S because callstack will have same amount of frame as height of a given branch.
// Left side will be executed and returned completely before right side
// execution begins. "h" is usually used to reflect height of given branch.
// Whereas if you denote your complexity with "d", it reflects deepest branch.
function nodeDepths(node, depth = 0) {
   if (node === null) {
      return 0;
   }
   return (
      depth +
      nodeDepths(node.left, depth + 1) +
      nodeDepths(node.right, depth + 1)
   );
}

// O(n)T | O(h)S
// O(h)S because at a time stack will have roughly same amount of node
// as the height of a given branch. "h" is usually used to reflect height
// of given branch. Whereas if you denote your complexity with "d", it reflects
// deepest branch.
// function nodeDepths(root) {
//    let nodeDepths = 0;
//    const stack = [{ node: root, depth: 0 }];

//    while (stack.length > 0) {
//       if (node == null) continue;
//       nodeDepths += depth;
//       stack.push({ node: node.left, depth: depth + 1 });
//       stack.push({ node: node.right, depth: depth + 1 });
//    }

//    return nodeDepths;
// }

//
// TEST
//
const root = new BinaryTree(1);
root.left = new BinaryTree(2);
root.left.left = new BinaryTree(4);
root.left.left.left = new BinaryTree(8);
root.left.left.right = new BinaryTree(9);
root.left.right = new BinaryTree(5);
root.right = new BinaryTree(3);
root.right.left = new BinaryTree(6);
root.right.right = new BinaryTree(7);

console.log(nodeDepths(root));
