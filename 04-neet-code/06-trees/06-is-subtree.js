//
// INSTRUCTIONS
//
// Given the roots of two binary trees root and subRoot, return true if there is a subtree
// of root with the same structure and node values of subRoot and false otherwise.
//
// A subtree of a binary tree tree is a tree that consists of a node in tree and all of this
// node's descendants. The tree tree could also be considered as a subtree of itself.
//

//
// PREPARATION
//
class TreeNode {
   constructor(value, left, right) {
      this.val = value;
      this.left = left;
      this.right = right;
   }
}

//
// CODE
//
var isSubtree = function (root, subRoot) {
   if (root == null) {
      return false;
   }
   if (dfs(root, subRoot)) {
      return true;
   }
   return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};

function dfs(node, target) {
   console.log(node?.val || null, target?.val || null);
   if (node == null && target == null) {
      return true;
   }
   if (node == null || target == null) {
      return false;
   }
   if (node.val != target.val) {
      return false;
   }
   return dfs(node.left, target.left) && dfs(node.right, target.right);
}

//
// TEST
//
const p = new TreeNode(
   3,
   new TreeNode(4, new TreeNode(1), new TreeNode(2, new TreeNode(0))),
   new TreeNode(5)
);

const q = new TreeNode(4, new TreeNode(1), new TreeNode(2));

console.log(isSubtree(p, q));
