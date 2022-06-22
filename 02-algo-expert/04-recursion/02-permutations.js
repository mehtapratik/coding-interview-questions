//
// INSTRUCTIONS
//
// Write a function that takes an array of integers and returns an array of
// all permutations of those integers in no particular order.
//

//
// EXAMPLE
//
// input:  [1, 2, 3]
// output: [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]
//

//
// CODE
//
// O(N * N!)T | O(N!)S
function getPermutations(nums) {
   const len = nums.length;
   const allPerms = [];
   getPermutationsHelper(0);
   return allPerms;

   function getPermutationsHelper(cursor) {
      if (cursor === len) {
         allPerms.push([...nums]);
         return;
      }

      for (let i = cursor; i < len; i++) {
         // swap the numbers
         [nums[i], nums[cursor]] = [nums[cursor], nums[i]];
         getPermutationsHelper(cursor + 1);
         // backtrack - putting the swapped numbers back
         [nums[i], nums[cursor]] = [nums[cursor], nums[i]];
      }
   }
}

//
// TEST
//
console.log(getPermutations([1, 2, 3]));
console.log(getPermutations([1, 2, 3, 4]));
