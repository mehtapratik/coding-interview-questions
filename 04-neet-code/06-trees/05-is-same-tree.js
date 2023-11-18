//
// INSTRUCTIONS
//
// Given the roots of two binary trees p and q, write a function to check if they are the same or not.
//
// Two binary trees are considered the same if they are structurally identical, and the
// nodes have the same value.

//
// PREPARATION
//
class TreeNode {
   constructor(value) {
      this.val = value;
      this.left = null;
      this.right = null;
   }
}

//
// CODE
//
function isSameTree(p, q) {
   return bfs(p, q);
   // return dfs(p, q);
}

function dfs(p, q) {
   if (p == null && q == null) {
      return true;
   }
   if (p == null || q == null) {
      return false;
   }
   if (p.val !== q.val) {
      return false;
   }
   return dfs(p.left, q.left) && dfs(p.right, q.right);
}

function bfs(p, q) {
   const queue = [[p, q]];

   while (queue.length > 0) {
      const [x, y] = queue.shift();
      if (x == null && y == null) {
         continue;
      }
      if (x == null || y == null) {
         return false;
      }
      if (x.val != y.val) {
         return false;
      }
      queue.push([x.left, y.left]);
      queue.push([x.right, y.right]);
   }

   return true;
}
