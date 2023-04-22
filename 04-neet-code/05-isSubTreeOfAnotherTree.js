//
// INSTRUCTIONS
//
// Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same
// structure and node values of subRoot and false otherwise.
//
// A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants.
// The tree tree could also be considered as a subtree of itself.
//

//
// EXAMPLE
//
// Example 1:
// Input: root = [3, 4, 5, 1, 2], subRoot = [4, 1, 2];
// Output: true;
// //
// Input: root = [3, 4, 5, 1, 2, null, null, null, null, 0], subRoot = [4, 1, 2];
// Output: false;
//

/*
tree =    [3, 4, 5, 1, 2]
subTree = [4, 1, 2]

queue     4 5 1 2
4

*/

//
// CODE
//
// O(n * m)T | O(n + m)S
function isSubstree(tree, subTree) {
   return dfs(0);

   function dfs(idx) {
      if (idx >= tree.length) return false;

      if (isSame(idx, 0)) return true;

      return dfs(idx * 2 + 1) || dfs(idx * 2 + 2);
   }

   function isNull(a, node) {
      return a >= node.length || node[a] == null;
   }

   function isSame(a, b) {
      if (a >= tree.length || b >= subTree.length)
         return isNull(a, tree) && isNull(b, subTree);

      return (
         tree[a] === subTree[b] &&
         isSame(a * 2 + 1, b * 2 + 1) &&
         isSame(a * 2 + 2, b * 2 + 2)
      );
   }
}

//
// TEST
//
console.log(isSubstree([3, 4, 5, 1, 2], [4, 1, 2]));
console.log(
   isSubstree([3, 4, 5, 1, 2, null, null, null, null, null, 5, 1], [4, 1, 2])
);
console.log(
   isSubstree([3, 4, 5, 1, 2, null, null, null, null, null, null, 1], [4, 1, 2])
);
