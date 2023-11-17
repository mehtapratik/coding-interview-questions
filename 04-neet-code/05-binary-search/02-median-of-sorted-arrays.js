//
// INSTRUCTIONS
//
// Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the
// two sorted arrays.
//
// The overall run time complexity should be O(log (m+n)).
//

//
// EXAMPLES
//
// Example 1:
// Input: nums1 = [1,3], nums2 = [2]
// Output: 2.00000
// Explanation: merged array = [1,2,3] and median is 2.
//
// Example 2:
// Input: nums1 = [1,2], nums2 = [3,4]
// Output: 2.50000
// Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
//

//
// CODE
//
function medianOfTwoSortedArrays(num1, num2) {
   const [x, y] = num1.length <= num2.length ? [num1, num2] : [num2, num1];

   const lenX = x.length;
   const lenY = y.length;
   const totalNums = lenX + lenY;
   let low = 0;
   let high = x.length;

   while (low <= high) {
      const centerX = high - Math.floor((high - low) / 2); // 1:2
      const centerY = Math.floor((totalNums + 1) / 2) - centerX; //1:5

      const lowX = centerX === 0 ? -Infinity : x[centerX - 1]; // 1
      const lowY = centerY === 0 ? -Infinity : y[centerY - 1]; // 4
      const highX = centerX === lenX ? Infinity : x[centerX]; // 2
      const highY = centerY === lenY ? Infinity : y[centerY]; // 5

      if (highX >= lowY && highY >= lowX) {
         if (totalNums % 2 === 0) {
            return (Math.max(lowX, lowY) + Math.min(highX, highY)) / 2;
         } else {
            return Math.max(lowX, lowY);
         }
      } else if (highX > lowY) {
         high = centerX - 1;
      } else {
         low = centerX + 1;
      }
   }
}

//
// TEST
//
console.log(medianOfTwoSortedArrays([1, 3], [2]));
