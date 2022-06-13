class TreeNode {
   constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
   }
}

const find_level_averages = function (root) {
   let result = [];

   let queue = [root]; // Imitation of Deque (a double-ended queue)

   while (queue.length > 0) {
      const NO_OF_NODES_AT_LEVEL = queue.length;
      let sumOfNodeValuesAtLevel = 0;
      for (let i = 0; i < NO_OF_NODES_AT_LEVEL; i++) {
         const node = queue.shift();
         sumOfNodeValuesAtLevel += node.value;
         if (node.left) queue.push(node.left);
         if (node.right) queue.push(node.right);
      }
      result.push(sumOfNodeValuesAtLevel / NO_OF_NODES_AT_LEVEL);
   }

   return result;
};

var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.left.right = new TreeNode(2);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);

console.log(`Level averages are: ${find_level_averages(root)}`);
