class TreeNode {
   constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
   }
}

const find_sum_of_path_numbers = function (root) {
   return findSumOfEachPath(root, 0);
};

/*
    |-findSum(1, '10') => 101 + findSum(null, '10') => 0             |-findSum(6, '11') => 116  + findSum(5, '11') => 115
 |-findSum(0,  '1') => 101                   +                    |-findSum(1, '1') => 231
findSum(1, '') => 332
*/
function findSumOfEachPath(node, number) {
   if (node == null) return 0;

   // i.e. number = 1 and node.value = 6 is to yield 16
   number = 10 * number + node.value;
   if (node.left == null && node.right == null) return number;
   return (
      findSumOfEachPath(node.left, number) +
      findSumOfEachPath(node.right, number)
   );
}

/*
               1
            0     1
         1     6    5

         101 + 116 + 115 = 332
*/

var root = new TreeNode(1);
root.left = new TreeNode(0);
root.right = new TreeNode(1);
root.left.left = new TreeNode(1);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(5);
console.log(`Total Sum of Path Numbers: ${find_sum_of_path_numbers(root)}`);
