//
// INSTRUCTIONS
//

//
// EXAMPLE
//
// Write a function that takes a targetSum an array of numbers as arguments.
// The function should return a boolean indicating whether or not it is possible
// to generate the targetSum using numbers from the array.
// . same number can be used twice
// . all numbers are non-negative
//

//
// CODE
//

/*
Without Memoization: O(n^m)T and O(m)S
With Memoization:O(n*m)TS
*/
function canSum(numbers, targetSum) {
   // eliminating invalid inputs
   if (
      Array.isArray(numbers) === false ||
      numbers.length === 0 ||
      typeof targetSum !== "number"
   ) {
      return false;
   }

   return dfs(numbers, targetSum);

   function dfs(numbers, remainder, memo = {}) {
      if (remainder in memo) {
         return memo[remainder];
      }
      // we have found at branch at dfs where sum of number matches `targetSum`
      if (remainder === 0) {
         return true;
      }
      // you're gone too far. since all numbers of array are assumed to be positive only,
      // remainder of less than 0 indicates `targetSum` is not possible within this
      // branch of dfs.
      if (remainder < 0) {
         return false;
      }

      memo[remainder] = false;
      for (let number of numbers) {
         // avoiding infinite loop in case if number is 0.
         if (number < 1) {
            break;
         }
         if (dfs(numbers, remainder - number, memo)) {
            memo[remainder] = true;
            break;
         }
      }
      return memo[remainder];
   }
}

//
// TEST
//
console.log(canSum([7, 1], 6));
