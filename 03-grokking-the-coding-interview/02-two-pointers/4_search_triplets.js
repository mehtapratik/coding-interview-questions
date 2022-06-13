/*
Given an array of unsorted numbers, find all unique triplets in it that add up to zero.

Example 1:

Input: [-3, 0, 1, 2, -1, 1, -2]
Output: [-3, 1, 2], [-2, 0, 2], [-2, 1, 1], [-1, 0, 1]
Explanation: There are four unique triplets whose sum is equal to zero.
Example 2:

Input: [-5, 2, -1, -2, 3]
Output: [[-5, 2, 3], [-2, -1, 3]]
Explanation: There are two unique triplets whose sum is equal to zero.
*/
const search_triplets = function (arr) {
   const triplets = [];

   arr.sort((a, b) => a - b);

   for (let cursor = 0; cursor < arr.length; cursor++) {
      const x = arr[cursor];
      // if (cursor > 0 && arr[cursor] === arr[cursor - 1]) {
      //    continue; // skip duplicate numbers
      // }

      let start = cursor + 1;
      let end = arr.length - 1;
      while (start < end) {
         const y = arr[start];
         const z = arr[end];
         const sum = x + y + z;

         if (sum === 0) {
            triplets.push([x, y, z]);
            start++;
            end--;
            // while (start < end && arr[start] === arr[start - 1]) {
            //    start++; // skip duplicate numbers
            // }
            // while (start < end && arr[end] === arr[end + 1]) {
            //    end--; // skip duplicate numbers
            // }
         } else if (sum > 0) {
            end--;
         } else {
            start++;
         }
      }
   }

   return triplets;
};
