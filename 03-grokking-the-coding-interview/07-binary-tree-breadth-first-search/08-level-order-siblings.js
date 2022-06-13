class TreeNode {
   constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
      this.next = null;
   }

   // level order traversal using 'next' pointer
   print_level_order() {
      console.log("Level order traversal using 'next' pointer: ");
      let nextLevelRoot = this;
      while (nextLevelRoot !== null) {
         let current = nextLevelRoot;
         nextLevelRoot = null;
         while (current != null) {
            console.log(`${current.val} `);
            if (nextLevelRoot === null) {
               if (current.left !== null) {
                  nextLevelRoot = current.left;
               } else if (current.right !== null) {
                  nextLevelRoot = current.right;
               }
            }
            current = current.next;
         }
         console.log();
      }
   }
}

const connect_level_order_siblings = function (root) {
   if (root == null) return root;

   let queue = [root]; // Imitating Deque (a double ended queue)
   while (queue.length > 0) {
      let previous = null;
      const NO_OF_NODES_AT_LEVEL = queue.length;
      for (let i = 0; i < NO_OF_NODES_AT_LEVEL; i++) {
         const current = queue.shift();
         if (previous) previous.next = current;
         // OR
         // if (i < NO_OF_NODES_AT_LEVEL - 1) current.next = queue[0];
         previous = current;
         if (current.left) queue.push(current.left);
         if (current.right) queue.push(current.right);
      }
   }

   return root;
};

var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
connect_level_order_siblings(root);

root.print_level_order();
