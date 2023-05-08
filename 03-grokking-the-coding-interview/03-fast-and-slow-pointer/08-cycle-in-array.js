//
// INSTRUCTIONS
//
// We are given an array containing positive and negative numbers. Suppose
// the array contains a number ‘M’ at a particular index.Now, if ‘M’ is
// positive we will move forward ‘M’ indices and if ‘M’ is negative move
// backwards ‘M’ indices.You should assume that the array is circular which
// means two things:
//
// 1. If, while moving forward, we reach the end of the array, we will jump to the
//    first element to continue the movement.
// 2. If, while moving backward, we reach the beginning of the array, we will jump
//    to the last element to continue the movement.
//
// Write a method to determine if the array has a cycle. The cycle should have more
// than one element and should follow one direction which means the cycle should not
// contain both forward and backward movements.
//

//
// EXAMPLE
//
// Example 1:
// Input: [1, 2, -1, 2, 2]
// Output: true
// Explanation: The array has a cycle among indices: 0 -> 1 -> 3 -> 0
//
// Example 2:
// Input: [2, 2, -1, 2]
// Output: true
// Explanation: The array has a cycle among indices: 1 -> 3 -> 1
//
// Example 3:
// Input: [2, 1, -1, -2]
// Output: false
// Explanation: The array does not have any cycle.
//

//
// CODE
//
function circular_array_loop_exists(arr) {
   let isForward = false;

   for (let i = 0; i < arr.length; i++) {
      isForward = arr[i] >= 0;

      let slow = i;
      let fast = i;

      while (true) {
         slow = find_next_index(slow);
         fast = find_next_index(find_next_index(fast));
         if (fast === -1 || slow === -1 || fast === slow) {
            break;
         }
      }

      if (slow !== -1 && fast === slow) {
         return true;
      }
   }

   return false;

   function find_next_index(currentIndex) {
      if (currentIndex === -1) {
         return currentIndex;
      }

      const dir = arr[currentIndex] >= 0;

      if (dir !== isForward) {
         return -1;
      }

      let nextIndex = (currentIndex + arr[currentIndex]) % arr.length;
      if (nextIndex < 0) {
         nextIndex += arr.length;
      }

      return nextIndex === currentIndex ? -1 : nextIndex;
   }
}

//
// TEST
//
console.log(circular_array_loop_exists([1, 2, -1, 2, 2]));
console.log(circular_array_loop_exists([2, 2, -1, 2]));
console.log(circular_array_loop_exists([2, 1, -1, -2]));

//
// COMPLEXITY ANALYSIS
//
// O(N^2)T | O(1)S
// The above algorithm will have a time complexity of O(N^2) where ‘N’ is the number of elements
// in the array. This complexity is due to the fact that we are iterating all elements
// of the array and trying to find a cycle for each element.
//
// The algorithm runs in constant space O(1).
//
// In our algorithm, we don’t keep a record of all the numbers that have been evaluated for
// cycles. We know that all such numbers will not produce a cycle for any other instance
// as well. If we can remember all the numbers that have been visited, our algorithm will
// improve to O(N) as, then, each number will be evaluated for cycles only once. We can keep
// track of this by creating a separate array, however, in this case, the space complexity
// of our algorithm will increase to O(N).
//
