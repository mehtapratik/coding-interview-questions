/*
Implement binary search algorithm. Return true if you find a given number
otherwise, return false.

Binary Search algorithm is considered Divide & Conquer algorithm where you split
the original problem into many smaller sub-problems. You keep doing that until
you can solve small enough problem brute-force and the solutions from those small problems
are consolidated to arrive at solution for original problem.

CAUTION: Array of numbers has to be sorted in order for this algorithm to work. If not, 
ask interviewer if you can sort original array or create a new one for this purpose.
*/
function binarySearch(nums, n) {
   console.log(nums, newNums);
   // If original array is not sorted and you're not allowed to mutate the array
   // you space complexity will be at least O(n) since you will have to generate branch
   // new array that generates sorted numbers
   // const newNums = [...nums];
   // newNums.sort((a, b) => a - b);
   return binarySearchIterative(nums, n, 0, nums.length - 1);

   // O(log(n))T | O(log(n))S
   function binarySearchDNC(nums, n, from, to) {
      if (from > to) return false;
      const midPoint = Math.floor((from + to) / 2);
      const midValue = nums[midPoint];
      if (midValue === n) {
         return true;
      } else if (n < midValue) {
         // search left half
         return binarySearchDNC(nums, n, from, midPoint - 1);
      } else {
         // seearch right half
         return binarySearchDNC(nums, n, midPoint + 1, to);
      }
   }

   // O(log(n))T | O(1)S
   function binarySearchIterative(nums, n) {
      let from = 0;
      let to = nums.length - 1;

      while (from <= to) {
         const midPoint = Math.floor((from + to) / 2);
         const midValue = nums[midPoint];
         if (midValue === n) {
            return true;
         } else if (n < midValue) {
            // search left half
            to = midPoint - 1;
         } else {
            // seearch right half
            from = midPoint + 1;
         }
      }

      return false;
   }
}

console.log(binarySearch([1, 21, 33, 0, 45, 45, 61, 71, 72, 73], 75));
