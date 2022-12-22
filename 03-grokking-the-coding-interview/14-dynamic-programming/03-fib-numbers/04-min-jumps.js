//
// INSTRUCTIONS
//
// Given an array of positive numbers, where each element represents the max number of jumps
// that can be made forward from that element, write a program to find the minimum number of
// jumps needed to reach the end of the array(starting from the first element).If an element
// is 0, then we cannot move through that element.
//

//
// EXAMPLE
//
// Input = {2,1,1,1,4}
// Output = 3
// Explanation: Starting from index '0', we can reach the last index through: 0 -> 2 -> 3 -> 4
//
// Input = {1,1,3,6,9,3,0,1,3}
// Output = 4
// Explanation: Starting from index '0', we can reach the last index through: 0->1->2->3->8
//

//
// CODE
//
function minJumps(nums) {
   const cache = {};
   // return dfs(0);
   // return memoization(0);
   return tabulation();

   // O(2^(n-2))T ~ O(2^n)T | O(n)S
   // We're starting from first number and stopping at last one. Therefore, those two numbers are
   // not part of time complexity calculation. For all other numbers we're running while
   // loop inside. In worst case this comes down to 2^n-2 if array is [n, n, n, n] where n is
   // length of array.
   function dfs(index) {
      // base case -> current dfs path successfully reached to last index
      if (index === nums.length - 1) {
         return 0;
      }

      // invalid cases: either we overreached the array of current number
      // is zero making it impossible to proceed further down current dfs path
      if (index >= nums.length || nums[index] === 0) {
         return Infinity;
      }

      let minJumps = Infinity;
      let start = index + 1;
      // we don't want index + num to go beyond array boundary so, take min of both
      const end = Math.min(index + nums[index], nums.length - 1);
      while (start <= end) {
         const currentJumps = dfs(start) + 1;
         minJumps = Math.min(currentJumps, minJumps);
         start += 1;
      }

      return minJumps;
   }

   // O(n^2)T | O(n)S
   // We're starting from first number and stopping at last one. Therefore, those two numbers are
   // not part of time complexity calculation. For all other numbers we're running while
   // loop inside. In worst case this comes down to n-2^2 if array is [n, n, n, n] where n is
   // length of array. This is reversed from standard brute force solution where it was 2^n-1 because
   // caching avoids duplication calculaton reducing need for calculating for same index only once.
   function memoization(index) {
      if (index in cache) {
         return cache[index];
      }

      if (index === nums.length - 1) {
         return 0;
      }

      if (index >= nums.length || nums[index] === 0) {
         return Infinity;
      }

      let start = index + 1;
      const end = Math.min(index + nums[index], nums.length - 1);
      let minJumps = Infinity;
      while (start <= end) {
         const currentJumps = memoization(start) + 1;
         minJumps = Math.min(currentJumps, minJumps);
         start += 1;
      }
      cache[index] = minJumps;

      return cache[index];
   }

   // O(n^2)T | O(n)S
   function tabulation() {
      // by default, table is initialied with largest possible number = infinity
      const table = Array(nums.length).fill(Infinity);

      // initialize first index with default value
      table[0] = 0;

      for (let start = 0; start < nums.length - 1; start++) {
         // inner loop will try to set min jump count to all the `nums` indices `start` can reach, i.e.
         // if `start` = 0 and `nums` is [2, 0, 5, 4, 3], then `table` will update to [0, 1, 1, Inf, Inf]
         // cause 0th index can reach both 1 and 2 indices in one jump
         const limit = Math.min(start + nums[start], nums.length - 1);
         for (let end = start + 1; end <= limit; end++) {
            // get min value for current end position
            table[end] = Math.min(table[end], table[start] + 1);
         }
      }

      return table[nums.length - 1];
   }
}

//
// TEST
//
console.log(minJumps([2, 1, 2, 4, 4]));
console.log(minJumps([1, 1, 3, 6, 9, 2, 0, 1, 3]));
console.log(minJumps([7, 7, 7, 7, 7, 7, 7, 7]));
