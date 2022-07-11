//
// INSTRUCTIONS
//
// Given an array of numbers which is sorted in ascending order and is rotated ‘k’ times around a pivot, find ‘k’.
//
// You can assume that the array does not have any duplicates.
//

//
// EXAMPLE
//
// Input: [10, 15, 1, 3, 8]
// Output: 2
// Explanation: The array has been rotated 2 times.
//
// Input: [4, 5, 7, 9, 10, -1, 2]
// Output: 5
// Explanation: The array has been rotated 5 times.
//
// Input: [1, 3, 8, 10]
// Output: 0
// Explanation: The array has not been rotated.
//

//
// CODE
//
function count_rotations(arr) {
   let start = 0;
   let end = arr.length - 1;

   while (start < end) {
      const mid = Math.floor(start + (end - start) / 2);

      // if mid index is truly in middle (greater than zero and less than last index),
      // see if its value is greater than its left and right value. If it is, then
      // you found the peak value where array is rotated
      if (
         mid > start &&
         mid < end &&
         arr[mid] > arr[mid - 1] &&
         arr[mid] > arr[mid + 1]
      ) {
         return mid + 1;
      }

      if (arr[start] < arr[mid]) {
         start = mid; // pivot is on the right side
      } else {
         end = mid; // pivot is on the left side
      }
   }

   if (end === 0) {
      // if end index is pointing at the beginning array is completely reversed and rotated from start to end
      return arr.length;
   } else {
      // otherwise, array is not rotated and sorted completely
      return 0;
   }
}

//
// TEST
//
console.log(count_rotations([10, 15, 1, 3, 8]));
console.log(count_rotations([4, 5, 7, 9, 10, -1, 2]));
console.log(count_rotations([1, 3, 8, 10]));
console.log(count_rotations([10, 9, 8, 7]));
