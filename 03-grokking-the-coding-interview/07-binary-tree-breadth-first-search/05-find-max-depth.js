class TreeNode {
   constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
   }
}

const find_max_depth = function depth(root) {
   if (root == null) return 0;

   const queue = [root]; // Imitation of Deque (a double-ended queue)
   let maxDepth = 0;

   while (queue.length > 0) {
      maxDepth++;
      const NO_OF_NODES_AT_LEVEL = queue.length;
      for (let i = 0; i < NO_OF_NODES_AT_LEVEL; i++) {
         const nodeAtHead = queue.shift();
         if (nodeAtHead.left) queue.push(nodeAtHead.left);
         if (nodeAtHead.right) queue.push(nodeAtHead.right);
      }
   }
   return maxDepth;
};

var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
console.log(`Tree Minimum Depth: ${find_max_depth(root)}`);
root.left.left = new TreeNode(9);
root.right.left.left = new TreeNode(11);
console.log(`Tree Minimum Depth: ${find_max_depth(root)}`);
