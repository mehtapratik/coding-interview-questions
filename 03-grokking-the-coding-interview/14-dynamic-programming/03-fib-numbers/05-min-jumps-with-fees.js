//
// INSTRUCTIONS
//
// Given a staircase with ‘n’ steps and an array of ‘n’ numbers representing the fee that you have
// to pay if you take the step.Implement a method to calculate the minimum fee required to reach
// the top of the staircase(beyond the top - most step).At every step, you have an option to take
// either 1 step, 2 steps, or 3 steps.You should assume that you are standing at the first step.
//

//
// EXAMPLE
//
// Number of stairs (n) : 6
// Fee: {1,2,5,2,1,2}
// Output: 3
// Explanation: Starting from index '0', we can reach the top through: 0->3->top
// The total fee we have to pay will be (1+2).
//
// Number of stairs (n): 4
// Fee: {2,3,4,5}
// Output: 5
// Explanation: Starting from index '0', we can reach the top through: 0->1->top
// The total fee we have to pay will be (2+3).
//

//
// CODE
//
function minJumpsWithFee(fees) {
   const cache = {};
   // return dfs(0);
   // return memoization(0);
   return tabulation();

   // O(3^n)T | O(n)S
   function dfs(index) {
      if (index >= fees.length) {
         return 0;
      }
      return Math.min(
         dfs(index + 1) + fees[index],
         dfs(index + 2) + fees[index],
         dfs(index + 3) + fees[index]
      );
   }

   // O(n)TS
   function memoization(index) {
      if (index in cache) {
         return cache[index];
      }

      if (index >= fees.length) {
         return 0;
      }

      cache[index] = Math.min(
         memoization(index + 1) + fees[index],
         memoization(index + 2) + fees[index],
         memoization(index + 3) + fees[index]
      );
      return cache[index];
   }

   // O(n)T | O(1)S
   function tabulation() {
      const table = Array(3).fill(Infinity);

      table[0] = 0; // if there are no steps, price is zero
      // we're assuming that we must start with first step.
      // therefore, we must account first step's price even though
      // 2nd or 3rd step is cheaper.
      table[1] = fees[0];
      table[2] = fees[0];

      for (let i = 2; i < fees.length; i++) {
         table[(i + 1) % 3] = Math.min(
            fees[i] + table[i % 3],
            fees[i - 1] + table[(i - 1) % 3],
            fees[i - 2] + table[(i - 2) % 3]
         );
      }
      return table[fees.length % 3];
   }
}

//
// TEST
//
console.log(minJumpsWithFee([1, 1, 2, 3, 3, 1, 5, 3]));
console.log(minJumpsWithFee([2, 3, 4, 5]));
