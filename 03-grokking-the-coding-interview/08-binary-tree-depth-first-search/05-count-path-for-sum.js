//
// INSTRUCTIONS
//
// Given a binary tree and a number ‘S’, find all paths in the tree such that
//  the sum of all the node values of each path equals ‘S’. Please note that
// the paths can start or end at any node but all paths must follow direction
// from parent to child(top to bottom).
//

//
// EXAMPLE
//
// input (tree):
//                1
//            /       \
//           7         9
//        /    \     /   \
//       6      5   2     3
//
// input (sum): 12
//
// output: 3 [because 7 > 5, 1 > 9 > 2 and 9 > 3 equals 12]
//

//
// PREPARATION
//
class TreeNode {
   constructor(value, left, right) {
      this.value = value;
      this.left = left;
      this.right = right;
   }
}

//
// CODE
//
// Worst Case O(n^2)T | O(n)S
// Average Case: O(NlogN) | O(logN)S
// The time complexity of the above algorithm is O(n^2) in the worst case,
// where ‘N’ is the total number of nodes in the tree. This is due to the fact
// that we traverse each node once, but for every node, we iterate the current path.
// The current path, in the worst case, can be O(n) in the case of a skewed tree).
// But, if the tree is balanced, then the current path will be equal to the height of the tree,
// i.e., O(log(n)).So the best case of our algorithm will be O((n)log(n)).
//
// The space complexity of the above algorithm will be O(n). This space will be used to
// store the recursion stack.The worst case will happe O(n) space for storing the
// currentPath in the worst case. But, if the tree is balanced, then currentPath will store
// only log(n) frames in stack. Therefore, average case space complexity will be O(log(n)).
function countPaths(rootNode, sum) {
   return countPathsRecursive(rootNode, sum, []);
}

function countPathsRecursive(currentNode, sum, currentPath) {
   // if current node is null, there can't be any path that adds up to "sum"
   if (currentNode == null) {
      return 0;
   }

   // Enqueue current node into currentPath queue
   currentPath.push(currentNode);

   // It is important run following loop from leaf node to the parent node
   // to identify matching paths. We're backtracking from leaf node to root node.
   // If there are any path above the leaf node that matches given sum, they will be
   // identified by parent recurisve calls
   let pathSum = 0;
   let pathCount = 0;
   for (let i = currentPath.length - 1; i >= 0; i--) {
      pathSum += currentPath[i].value;
      if (pathSum === sum) {
         pathCount++;
      }
   }
   console.log(
      "Node of paths found at ",
      currentNode.value,
      " are ",
      pathCount
   );

   // now that we've identified all paths up to current node,
   // we go further down to find additional paths down the tree
   pathCount += countPathsRecursive(currentNode.left, sum, currentPath);
   pathCount += countPathsRecursive(currentNode.right, sum, currentPath);

   // Dequeue current node to backtrack up to parent node
   currentPath.pop();

   return pathCount;
}

//
// TEST
//

const root = new TreeNode(
   1,
   new TreeNode(7, new TreeNode(6), new TreeNode(5)),
   new TreeNode(9, new TreeNode(2), new TreeNode(3))
);

console.log(countPaths(root, 12));
