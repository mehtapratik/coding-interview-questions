class TreeNode {
   constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
   }
}

const hasPath = function (node, sum) {
   // Recursive loop terminal case:
   // If current node is already null, that means we're at the leaf node.
   // We also don't want to proceed if `sum` is invalid input
   if (node == null || typeof sum !== "number") {
      return false;
   }

   // If current node is leaf node and its value equals `remaining sum`, you've
   // found the path whose total equals `original sum`.
   if (node.value === sum && node.left == null && node.right == null) {
      return true;
   }

   // If current node is not a leaf node, continue finding children node's that may match
   // remaining sum value
   return (
      hasPath(node.left, sum - node.value) ||
      hasPath(node.right, sum - node.value)
   );
};

var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
console.log(`Tree has path: ${hasPath(root, 23)}`);
console.log(`Tree has path: ${hasPath(root, 16)}`);
