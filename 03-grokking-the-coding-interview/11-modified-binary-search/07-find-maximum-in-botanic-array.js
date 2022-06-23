//
// INSTRUCTIONS
//
// Find the maximum value in a given Bitonic array. An array is considered bitonic if
// it is monotonically increasing and then monotonically decreasing.Monotonically
// increasing or decreasing means that for any index i in the array arr[i] != arr[i + 1].
//

//
// EXAMPLE
//
// Input: [1, 3, 8, 12, 4, 2]
// Output: 12
// Explanation: The maximum number in the input bitonic array is '12'.
//
// Input: [3, 8, 3, 1]
// Output: 8
//
// Input: [1, 3, 8, 12]
// Output: 12
//
// Input: [10, 9, 8]
// Output: 10
//

//
// CODE
//
const find_max_in_bitonic_array = function (arr) {
   let start = 0;
   let end = arr.length - 1;

   while (start < end) {
      const mid = Math.floor(start + (end - start) / 2);
      if (arr[mid] > arr[mid + 1]) {
         // mid (left portion) value is greater than right
         // so, move to left half to find the biggest value (peak)
         end = mid;
      } else {
         // Right portion value is greater than left
         // so, move to right half to find the biggest value (peak)
         start = mid + 1;
      }
   }
   return arr[start];
};

//
// TEST
//
console.log(find_max_in_bitonic_array([1, 3, 8, 12, 4, 2]));
console.log(find_max_in_bitonic_array([3, 8, 3, 1]));
console.log(find_max_in_bitonic_array([1, 3, 8, 12]));
console.log(find_max_in_bitonic_array([10, 9, 8]));
