//
// INSTRUCTIONS
//
// Given an array of integers nums which is sorted in ascending order, and an integer target,
// write a function to search target in nums.If target exists, then return its index.Otherwise,
// return -1.
//
// You must write an algorithm with O(log n) runtime complexity.
//

//
// EXAMPLES
//
// Example 1:
// Input: nums = [-1,0,3,5,9,12], target = 9
// Output: 4
// Explanation: 9 exists in nums and its index is 4
//
// Example 2:
// Input: nums = [-1,0,3,5,9,12], target = 2
// Output: -1
// Explanation: 2 does not exist in nums so return -1
//

//
// CODE
//
function binarySearch(nums, target) {
   let from = 0;
   let to = nums.length - 1;

   while (from <= to) {
      if (target < nums[from] || target > nums[to]) {
         return -1;
      }
      const mid = from + Math.floor((to - from) / 2);
      const val = nums[mid];
      if (val === target) {
         return mid;
      }
      if (val > target) {
         to = mid - 1;
      } else {
         from = mid + 1;
      }
   }

   return -1;
}

//
// TEST
//
console.log(binarySearch([-1, 0, 3, 5, 9, 12], 9));
