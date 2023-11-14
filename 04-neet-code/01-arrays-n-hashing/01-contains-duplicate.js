//
// INSTRUCTIONS
//
// Given an integer array nums, return true if any value appears at least
// twice in the array, and return false if every element is distinct.
//

//
// EXAMPLES
//
// Example 1:
// Input: nums = [1,2,3,1]
// Output: true
//
// Example 2:
// Input: nums = [1,2,3,4]
// Output: false
//
// Example 3:
// Input: nums = [1,1,1,3,3,4,3,2,4,2]
// Output: true
//

//
// CODE
//
function containsDuplicateHash(nums) {
   const seen = {};
   for (let num of nums) {
      if (num in seen) {
         return true;
      }
      seen[num] = true;
   }

   return false;
}

function containsDuplicateSort(nums) {
   if (Array.isArray(nums) === false || nums.length < 2) {
      return false;
   }

   nums.sort((a, b) => a - b);
   for (let i = 1; i < nums.length; i++) {
      if (nums[i - 1] === nums[i]) {
         return true;
      }
   }

   return false;
}

function containsDuplicateRecursive(nums) {
   if (Array.isArray(nums) === false || nums.length < 2) {
      return false;
   }

   nums.sort((a, b) => a - b);
   return _recursion(1);

   function _recursion(index) {
      if (index >= nums.length) {
         return false;
      }

      if (nums[index - 1] === nums[index]) {
         return true;
      }

      return _recursion(index + 1);
   }
}

//
// TEST
//
