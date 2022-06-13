// const Deque = require("./collections/deque"); //http://www.collectionsjs.com

class TreeNode {
   constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
   }
}

const findPaths = function (root, sum) {
   const currentPath = new Deque(); // OR [] - to imitate deque
   return findPathsRecursive(root, sum, currentPath, []);
};

const findPathsRecursive = function (node, sum, currentPath, matchedPaths) {
   // Making sure node is valid and sum is valid number
   if (node == null || typeof sum !== "number") return matchedPaths;

   // add current node's value to currentPath array
   currentPath.push(node.value);
   // if the current node is a leaf and its value is equal to sum, save the current path
   if (node.value === sum && node.left == null && node.right == null) {
      matchedPaths.push(currentPath.toArray());
   } else {
      findPathsRecursive(
         node.left,
         sum - node.value,
         currentPath,
         matchedPaths
      );
      findPathsRecursive(
         node.right,
         sum - node.value,
         currentPath,
         matchedPaths
      );
   }

   // remove the current node from the path to backtrack,
   // we need to remove the current node while we are going up the recursive call stack.
   currentPath.pop(node.value);

   return matchedPaths;
};

var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(4);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
sum = 23;
console.log(findPaths(root, sum));
