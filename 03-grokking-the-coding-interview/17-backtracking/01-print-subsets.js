//
// INSTRUCTIONS
//
// Given a set of positive integers, find all its subsets.
//

//
// EXAMPLE
//
// Input:  {1, 2, 3}
// Output: [], [1], [1 2], [1 2 3], [1 3], [2], [2 3], [3]

// Input:  1 2
// Output: [], [1], [2], [1 2]

//
// CODE
//
function printSubsets(nums) {
   const subsets = [];
   // iterative(0, []); // best
   backtrack1(0, []); // better
   // backtrack2(0, []); // acceptable
   return subsets;

   // O(n * 2^n)T since we're generating 2^n subsets and for each subset we may have to push as many as n numbers.
   // O(n * 2^n)S for output array otherwise O(1)S
   function iterative() {
      subsets.push([]);
      for (const num of nums) {
         const len = subsets.length;
         for (let i = 0; i < len; i++) {
            subsets.push([...subsets[i], num]);
         }
      }
   }

   // O(n * 2^n)T since we're generating 2^n subsets and for each subset we may have to push as many as n numbers.
   // O(n * 2^n)S - It will take (n * 2^n) space for output array and n space for recursion stack
   function backtrack1(i, subset) {
      subsets.push([...subset]);
      if (i === nums.length) return;

      for (let j = i; j < nums.length; j++) {
         subset.push(nums[j]);
         backtrack1(j + 1, subset);
         subset.pop(nums[j]);
      }
   }

   // O(n * 2^n)T since we're generating 2^n subsets and for each subset we may have to push as many as n numbers.
   // O(n * 2^n)S - It will take (n * 2^n) space for output array and n space for recursion stack
   function backtrack2(i, subset) {
      if (i === nums.length) {
         subsets.push([...subset]);
         return;
      }

      // skip current number
      backtrack2(i + 1, [...subset]);

      // include current number
      subset.push(nums[i]);
      backtrack2(i + 1, [...subset]);
   }
}

//
// TEST
//
console.log(printSubsets([1, 2, 3]));
console.log(printSubsets([1, 2]));
