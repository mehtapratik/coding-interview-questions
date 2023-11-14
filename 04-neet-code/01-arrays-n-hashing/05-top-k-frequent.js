//
// INSTRUCTIONS
//
// Given an integer array nums and an integer k, return the k most frequent elements.
// You may return the answer in any order.

//
// EXAMPLES
//
// Example 1:
// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]
//
// Example 2:
// Input: nums = [1], k = 1
// Output: [1]
//

//
// CODE
//
/*
 heap
*/
var topKFrequent = function (nums, K) {
   if (Array.isArray(nums) === false || typeof K !== "number" || K < 1) {
      return undefined;
   }

   const frequencyMap = new Map();
   const indexedNums = new Array(nums.length + 1).fill(undefined);
   const topK = [];

   for (const num of nums) {
      const currentCount = frequencyMap.get(num) ?? 0;
      frequencyMap.set(num, currentCount + 1);
   }

   for (const [num, count] of frequencyMap) {
      const indexedLocation = nums.length - count;
      const numsWithSameCount = indexedNums[indexedLocation] || [];
      numsWithSameCount.push(num);
      indexedNums[indexedLocation] = numsWithSameCount;
   }

   let count = K;
   for (const nums of indexedNums) {
      if (count == 0) {
         break;
      }
      if (Array.isArray(nums)) {
         for (const num of nums) {
            topK.push(num);
            count--;
            if (count == 0) {
               break;
            }
         }
      }
   }
   return topK;
};

//
// TEST
//
console.log(topKFrequent([1, 1, 3, 3, 2, 3], 2));
