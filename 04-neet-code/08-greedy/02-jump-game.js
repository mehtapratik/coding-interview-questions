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
// Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0,
// which makes it impossible to reach the last index.
//

//
// CODE
//
function solve(nums) {
   let need = 0;
   for (let i = nums.length - 1; i >= 0; i--) {
      if (nums[i] < need) {
         need += 1;
      } else {
         need = 1;
      }
   }
   return need === 1;
}

//
// TEST
//
console.log(solve([2, 3, 1, 1, 4]));
console.log(solve([3, 2, 1, 0, 4]));
