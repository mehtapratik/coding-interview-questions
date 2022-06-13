class TreeNode {
   constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
   }
}

const traverse = function (root) {
   if (root == null) return [];

   const result = [];

   const queue = [root];
   let flip = false;
   while (queue.length > 0) {
      // At this point in loop, our queue will only have nodes for single level.
      // Let's get that number before we start inserting nodes for next level
      const NO_OF_NODES_AT_LEVEL = queue.length;
      const levelNodeValues = [];
      for (let i = 0; i < NO_OF_NODES_AT_LEVEL; i++) {
         // Pull current level of nodes from the beginning of the queue
         const node = queue.shift();
         flip
            ? levelNodeValues.unshift(node.value)
            : levelNodeValues.push(node.value);
         // Append nodes for the next level at the end of the queue
         if (node.left) queue.push(node.left);
         if (node.right) queue.push(node.right);
      }
      flip = !flip;
      result.push(levelNodeValues);
   }
   return result;
};

var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
root.right.left.left = new TreeNode(20);
root.right.left.right = new TreeNode(17);
console.log(`Zigzag traversal: ${0}`, traverse(root));
