/*
   We are given an unsorted array containing ‘n’ numbers taken from the range 1 to ‘n’. 
   The array has some numbers appearing twice, find all these duplicate numbers without using any extra space.

   Example 1:
   Input: [3, 4, 4, 5, 5]
   Output: [4, 5]

   Example 2:
   Input: [5, 4, 7, 2, 3, 5, 3]
   Output: [3, 5]
*/

// method 1
const __find_duplicates__ = function (nums) {
   const dups = [];
   const len = nums.length;

   let i = 0;
   while (i < len) {
      if (nums[i] === i + 1) {
         // correct placement
         i++;
      } else {
         // misplaced number
         const j = nums[i] - 1;
         if (nums[i] === nums[j]) {
            dups.push(nums[i]);
            i++;
         } else {
            [nums[i], nums[j]] = [nums[j], nums[i]];
         }
      }
   }
   return dups;
};

// method 2
const find_duplicates = function (nums) {
   const dups = [];
   const len = nums.length;

   let i = 0;
   while (i < len) {
      const j = nums[i] - 1;
      if (nums[i] === nums[j]) {
         i++;
      } else {
         [nums[i], nums[j]] = [nums[j], nums[i]];
      }
   }

   for (i = 0; i < len; i++) {
      if (nums[i] !== i + 1) dups.push(nums[i]);
   }
   return dups;
};

console.log(find_duplicates([3, 4, 4, 5, 5]));
console.log(find_duplicates([5, 4, 7, 2, 3, 5, 3]));
