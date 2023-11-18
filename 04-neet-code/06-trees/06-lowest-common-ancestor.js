//
// INSTRUCTIONS
//
// Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given
// nodes in the BST.
//
// According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined
// between two nodes p and q as the lowest node in T that has both p and q as descendants
// (where we allow a node to be a descendant of itself).”
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
function solve(root, p, q) {
   if (root.val > p.val && root.val > q.val) {
      return solve(root.left, p, q);
   }

   if (root.val < p.val && root.val < q.val) {
      return solve(root.right, p, q);
   }

   return root;
}

//
// TEST
//
const p = new TreeNode(2, new TreeNode(0));
const q = new TreeNode(6);
const tree = new TreeNode(7, new TreeNode(5, p, q), new TreeNode(8));

console.log(solve(tree, p, q));
