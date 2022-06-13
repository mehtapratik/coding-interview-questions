class TreeNode {
   constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
   }
}

const traverse = function (root) {
   if (root == null) return [];
   const result = []; // Imitation of Deque (a double-ended queue)
   const queue = [root]; // Imitation of Deque (a double-ended queue)
   while (queue.length > 0) {
      const LEVEL_NODE_COUNT = queue.length;
      const levelNodeValues = [];
      for (let i = 0; i < LEVEL_NODE_COUNT; i++) {
         const node = queue.shift();
         levelNodeValues.push(node.val);
         if (node.left) queue.push(node.left);
         if (node.right) queue.push(node.right);
      }
      result.unshift(levelNodeValues);
   }

   return result;
};

var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
console.log(`Level order traversal:`, traverse(root));
