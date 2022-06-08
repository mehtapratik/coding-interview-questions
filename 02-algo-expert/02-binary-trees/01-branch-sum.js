//
// INSTRUCTIONS
//
// Write a function that takes are binary tree and returns a list of
// its branch sum ordered from left most to right most branch sum.

//
// EXAMPLE
// input:
//                    1
//              /           \
//             2             3
//          /    \        /     \
//         4      5      6       7
//       /   \   /
//      8    9  10
// output: [15, 16, 18, 12, 11]

//
// PREPARATION
//
class BinaryTree {
   constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
   }

   insert(values, i = 0) {
      if (i >= values.length) return;
      const queue = [this];
      while (queue.length > 0) {
         let current = queue.shift();
         if (current.left === null) {
            current.left = new BinaryTree(values[i]);
            break;
         }
         queue.push(current.left);
         if (current.right === null) {
            current.right = new BinaryTree(values[i]);
            break;
         }
         queue.push(current.right);
      }
      this.insert(values, i + 1);
      return this;
   }
}

//
// CODE
//
// O(n)T | O(n)S
// Space required to generate the array will be (N/2) which equals to O(N). On an average
// balanced tree, you will have roughly half the amount of branches. And since we're making
// sum of all branches, you will need half the space to the N.
//
// Also, the space complexity due to recursive callstack is O(logN) since every time you
// recurse to left or right, you're eliminating other half of the tree. In worst case
// where tree is heavily skewed and you have one very long branch, space complexity will be O(n).
function branchSums(root, sum = 0, sums = []) {
   // if a given node is null, we just return without
   // adding calculated sum to the array
   if (root == null) return;

   // current node is leaf node, push the sum to the output array
   if (root.left == null && root.right == null) {
      sums.push(sum + root.value);
      return;
   }

   branchSums(root.left, sum + root.value, sums);
   branchSums(root.right, sum + root.value, sums);

   return sums;
}

//
// TEST
//
const tree = new BinaryTree(1).insert([2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(branchSums(tree));
