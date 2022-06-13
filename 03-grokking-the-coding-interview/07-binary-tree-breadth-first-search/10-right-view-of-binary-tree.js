class TreeNode {
   constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
   }
}

const tree_right_view = function (root) {
   if (root == null) return null;
   const result = [];

   const queue = [root]; // Imitating deque (a doube ended queue)
   while (queue.length > 0) {
      const NO_OF_NODE_AT_LEVEL = queue.length;
      for (let i = 0; i < NO_OF_NODE_AT_LEVEL; i++) {
         const node = queue.shift();
         // Append node's value to the result if it is last node at current level
         if (i === NO_OF_NODE_AT_LEVEL - 1) result.push(node.value);
         if (node.left) queue.push(node.left);
         if (node.right) queue.push(node.right);
      }
   }

   return result;
};

var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
root.left.left.left = new TreeNode(3);
console.log("Tree right view: " + tree_right_view(root));
