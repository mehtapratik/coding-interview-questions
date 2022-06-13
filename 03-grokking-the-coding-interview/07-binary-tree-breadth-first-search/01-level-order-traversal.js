class TreeNode {
   constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
   }
}

const traverse = function (root) {
   let result = [];

   if (root == null) return result;

   const deQue = [root]; // Imitation of Deque (a double-ended queue)

   while (deQue.length > 0) {
      const levelLength = deQue.length;
      const levelValues = [];
      for (let i = 0; i < levelLength; i++) {
         const node = deQue.shift();
         levelValues.push(node.val);
         if (node.left) deQue.push(node.left);
         if (node.right) deQue.push(node.right);
      }
      result.push(levelValues);
   }

   return result;
};

var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
console.log(`Level order traversal: ${traverse(root)}`);
