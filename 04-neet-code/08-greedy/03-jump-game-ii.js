//
// INSTRUCTIONS
//
// You are given an integer array nums. You are initially positioned at the array's
// first index, and each element in the array represents your maximum jump length at
// that position.
//
// Return true if you can reach the last index, or false otherwise.
//

//
// EXAMPLES
//
// Example 1:
// Input: nums = [2,3,1,1,4]
// Output: true
// Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
//
// Example 2:
// Input: nums = [3,2,1,0,4]
// Output: false
// Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
//

//
// 3, 1, 2, 0, 1, 4
//

//
// CODE
//
function solve(nums) {
   const cache = {};
   return dfs(0);

   function dfs(index) {
      if (cache[index]) {
         return cache[index];
      }
      if (index === nums.length - 1) {
         return 0;
      }

      let jumps = nums[index];
      if (jumps === 0 || index >= nums.length) {
         return -1;
      }

      let minJumps = Infinity;
      while (jumps > 0) {
         const current = dfs(index + jumps);
         cache[index + jumps] = current;
         if (current >= 0) {
            minJumps = Math.min(minJumps, current + 1);
         }
         jumps--;
      }
      return minJumps;
   }
}

//
// TEST
//
console.log(solve([3, 1, 0, 1, 4]));
console.log(solve([2, 3, 1, 1, 4]));
