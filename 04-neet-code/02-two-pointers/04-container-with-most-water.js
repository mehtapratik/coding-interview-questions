//
// INSTRUCTIONS
//
// You are given an integer array height of length n. There are n vertical lines
// drawn such that the two endpoints of the ith line are(i, 0) and(i, height[i]).
//
// Find two lines that together with the x-axis form a container, such that the container
// contains the most water.
//
// Return the maximum amount of water a container can store.
//
// Notice that you may not slant the container.
//

//
// EXAMPLE
//
// https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg
// Input: height = [1,8,6,2,5,4,8,3,7]
// Output: 49
// Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7].
// In this case, the max area of water(blue section) the container can contain is 49.
//

//
// CODE
//
function containerWithMostWater(nums) {
   let start = 0;
   let end = nums.length - 1;

   let mostWaterQty = -Infinity;
   while (start < end) {
      const waterPerIncrement = Math.min(nums[start], nums[end]);
      const currentWaterQty = (end - start) * waterPerIncrement;
      mostWaterQty = Math.max(mostWaterQty, currentWaterQty);
      if (nums[start] < nums[end]) {
         start++;
      } else {
         end--;
      }
   }

   return mostWaterQty;
}

//
// TEST
//
console.log(containerWithMostWater([1, 8, 6, 2, 5, 4, 8, 3, 7]));
console.log(containerWithMostWater([1, 1]));
