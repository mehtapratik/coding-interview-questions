//
// INSTRUCTIONS
//
// You are given an m x n integer matrix matrix with the following two properties:
//
// Each row is sorted in non-decreasing order.
// The first integer of each row is greater than the last integer of the previous row.
// Given an integer target, return true if target is in matrix or false otherwise.
//
// You must write a solution in O(log(m * n)) time complexity.
//

//
// EXAMPLES
//
// Example 1
// matrix = [
//    [01, 03, 05, 07],
//    [10, 11, 16, 20],
//    [23, 30, 34, 60],
// ]
// target = 3
// Output: true;
//
// Example 2
// matrix = [
//    [01, 03, 05, 07],
//    [10, 11, 16, 20],
//    [23, 30, 34, 60],
// ]
// target = 13
// Output: false;
//

//
// CODE
//
function solve(matrix, target) {
   const rowLen = matrix.length;
   const colLen = matrix[0].length;
   const len = rowLen * colLen;

   let start = 0;
   let end = len - 1;
   while (start <= end) {
      const mid = start + Math.floor((end - start) / 2);
      const rowIdx = Math.floor(mid / colLen);
      const colIdx = mid - colLen * rowIdx;
      const val = matrix[rowIdx][colIdx];
      if (val === target) {
         return true;
      } else {
         if (val > target) {
            end = mid - 1;
         } else {
            start = mid + 1;
         }
      }
   }

   return false;
}

//
// TEST
//
console.log(
   solve(
      [
         [1, 3, 5, 7],
         [10, 11, 16, 20],
         [23, 30, 34, 60],
      ],
      3
   )
);
