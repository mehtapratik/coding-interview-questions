//
// INSTRUCTIONS
//
// Given an array of numbers sorted in ascending order, find the element in the array that
// has the minimum difference with the given ‘key’.

//
// EXAMPLE
//
// Input: [4, 6, 10], key = 7
// Output: 6
// Explanation: The difference between the key '7' and '6' is minimum than any other number in the array
//
// Input: [4, 6, 10], key = 4
// Output: 4
//
// Input: [1, 3, 8, 10, 15], key = 12
// Output: 10
//
// Input: [4, 6, 10], key = 17
// Output: 10
//

//
// CODE
//
const search_min_diff_element = function (arr, key) {
   // either of the inputs are invalid
   if (
      Array.isArray(arr) === false ||
      arr.length === 0 ||
      typeof key !== "number"
   ) {
      return -1;
   }
   // key is smaller than smallest value in array
   if (key < arr[0]) {
      return arr[0];
   }
   // key greater than greatest value in array
   if (key > arr[arr.length - 1]) {
      return arr[arr.length - 1];
   }

   // At this point we know key value is within the range of
   // arr's bounds. We just need to find closest value
   let start = 0;
   let end = arr.length - 1;

   while (start <= end) {
      const mid = Math.floor(start + (end - start) / 2);
      const midValue = arr[mid];
      if (midValue === key) {
         return midValue;
      } else if (midValue < key) {
         start = mid + 1;
      } else {
         end = mid - 1;
      }
   }

   if (Math.abs(arr[start] - key) < Math.abs(arr[end] - key)) {
      return arr[start];
   } else {
      return arr[end];
   }
};

//
// TEST
//
console.log(search_min_diff_element([4, 6, 10], 7));
console.log(search_min_diff_element([4, 6, 10], 4));
console.log(search_min_diff_element([1, 3, 8, 10, 15], 12));
console.log(search_min_diff_element([4, 6, 10], 17));
