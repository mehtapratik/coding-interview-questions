//
// INSTRUCTIONS
//
// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such
// that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
//
// Notice that the solution set must not contain duplicate triplets.
//

//
// EXAMPLES
//
// Example 1:
// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation:
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].
// Notice that the order of the output and the order of the triplets does not matter.
//
// Example 2:
// Input: nums = [0,1,1]
// Output: []
// Explanation: The only possible triplet does not sum up to 0.
//
// Example 3:
// Input: nums = [0,0,0]
// Output: [[0,0,0]]
// Explanation: The only possible triplet sums up to 0.
//

//
// CODE
//
function triplets(nums) {
   const result = [];
   nums.sort((a, b) => a - b);
   for (let i = 0; i < nums.length; i++) {
      if (nums[i] > 0) {
         // break out since all other numbers from this point will be greater than
         // zero and you will no longer find sum of zero
         break;
      }

      if (i > 0 && nums[i - 1] === nums[i]) {
         continue;
      }
      const x = nums[i];
      let start = i + 1;
      let end = nums.length - 1;

      while (start < end) {
         const y = nums[start];
         const z = nums[end];
         const sum = x + y + z;

         if (sum > 0) {
            end--;
         } else if (sum < 0) {
            start++;
         } else {
            result.push([x, y, z]);
            start++;
            end--;
            while (start < end && nums[start - 1] === nums[start]) {
               start++;
            }
            while (start < end && nums[end + 1] === nums[end]) {
               end--;
            }
         }
      }
   }

   return result;
}

//
// TEST
//
console.log(triplets([-1, 0, 1, 2, -1, -4]));
console.log(triplets([0, 1, 1]));
console.log(triplets([0, 0, 0]));
