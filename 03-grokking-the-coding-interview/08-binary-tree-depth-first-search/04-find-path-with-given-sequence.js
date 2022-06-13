class TreeNode {
   constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
   }
}

const find_path = function (root, sequence) {
   return findPathRecursive2(root, sequence, 0);
};

function findPathRecursive(node, sequence, i) {
   if (node != null && node.value === sequence[i]) {
      return (
         findPathRecursive(node.left, sequence, i + 1) ||
         findPathRecursive(node.right, sequence, i + 1)
      );
   } else {
      return sequence.length === i;
   }
}

// OR

function findPathRecursive2(node, sequence, i) {
   if (node == null) {
      return false;
   }

   if (i >= sequence.length || node.value !== sequence[i]) {
      return false;
   }

   // if the current node is a leaf, add it is the end of the sequence, we have found a path!
   if (node.left == null && node.right == null && i === sequence.length - 1) {
      return true;
   }

   // recursively call to traverse the left and right sub-tree
   // return true if any of the two recursive call return true
   return (
      findPathRecursive2(node.left, sequence, i + 1) ||
      findPathRecursive2(node.right, sequence, i + 1)
   );
}

var root = new TreeNode(1);
root.left = new TreeNode(0);
root.right = new TreeNode(1);
root.left.left = new TreeNode(1);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(5);

console.log(`Tree has path sequence: ${find_path(root, [1, 0, 7])}`);
console.log(`Tree has path sequence: ${find_path(root, [1, 1, 6])}`);
