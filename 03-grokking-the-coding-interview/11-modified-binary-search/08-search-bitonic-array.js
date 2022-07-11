//
// INSTRUCTIONS
//
// Given a Bitonic array, find if a given ‘key’ is present in it. An array is considered
// bitonic if it is monotonically increasing and then monotonically decreasing. Monotonically
// increasing or decreasing means that for any index i in the array arr[i] != arr[i + 1].
//
// Write a function to return the index of the ‘key’. If the ‘key’ is not present, return -1.
//

//
// EXAMPLE
//
// Input: [1, 3, 8, 4, 3], key=4
// Output: 3
//
// Input: [3, 8, 3, 1], key=8
// Output: 1
//
// Input: [1, 3, 8, 12], key=12
// Output: 3
//
// Input: [10, 9, 8], key=10
// Output: 0
//

//
// CODE
//
const search_bitonic_array = function (arr, key) {
   // first find the peak value index in bitonic array
   const peakIndex = findPeak(arr);

   // find the key to left of peak value including peak value itself
   const idxFoundInLeftHalf = orderAgnosticBinarySearch(arr, 0, peakIndex, key);
   if (idxFoundInLeftHalf > -1) {
      return idxFoundInLeftHalf;
   }
   // if key isn't available in left half, find it to the right of peak value
   return orderAgnosticBinarySearch(arr, peakIndex + 1, arr.length - 1, key);
};

function findPeak(arr) {
   let start = 0;
   let end = arr.length - 1;

   while (start < end) {
      const mid = Math.floor(start + (end - start) / 2);
      if (arr[mid] > arr[mid + 1]) {
         end = mid;
      } else {
         start = mid + 1;
      }
   }
   return start;
}

function orderAgnosticBinarySearch(arr, start, end, key) {
   while (start <= end) {
      const mid = Math.floor(start + (end - start) / 2);
      if (arr[mid] === key) {
         return mid;
      }
      if (arr[start] < arr[end]) {
         //ascending order
         if (arr[mid] < key) {
            start = mid + 1;
         } else {
            end = mid - 1;
         }
      } else {
         //descending order
         if (arr[mid] < key) {
            end = mid - 1;
         } else {
            start = mid + 1;
         }
      }
   }
   return -1;
}

//
// TEST
//
console.log(search_bitonic_array([1, 3, 8, 4, 3], 4));
console.log(search_bitonic_array([3, 8, 3, 1], 8));
console.log(search_bitonic_array([1, 3, 8, 12], 12));
console.log(search_bitonic_array([10, 9, 8], 10));
