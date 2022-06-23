//
// INSTRUCTIONS
//
// Given an array of numbers sorted in ascending order, find the range of a given number ‘key’.
// The range of the ‘key’ will be the first and last position of the ‘key’ in the array.
//
// Write a function to return the range of the ‘key’. If the ‘key’ is not present return [-1, -1].
//

//
// EXAMPLE
//
// Input: [4, 6, 6, 6, 9], key = 6
// Output: [1, 3]
//
// Example 2:
// Input: [1, 3, 8, 10, 15], key = 10
// Output: [3, 3]
//
// Input: [1, 3, 8, 10, 15], key = 12
// Output: [-1, -1]
//

//
// CODE
//
const find_range = function (arr, key) {
   const range = [-1, -1];
   let start = 0;
   let end = arr.length - 1;

   while (start <= end) {
      const mid = Math.floor(start + (end - start) / 2);
      if (arr[mid] === key) {
         let i = mid;
         while (arr[i] === key) {
            range[0] = i;
            i--;
         }
         i = mid;
         while (arr[i] === key) {
            range[1] = i;
            i++;
         }
         break;
      } else if (arr[mid] < key) {
         start = mid + 1;
      } else {
         end = mid - 1;
      }
   }

   return range;
};

//
// TEST
//
console.log(find_range([4, 6, 6, 6, 9], 6));
console.log(find_range([1, 3, 8, 10, 15], 10));
console.log(find_range([1, 3, 8, 10, 15], 12));
