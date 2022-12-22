//
// INSTRUCTIONS
//
// Given a number ‘n’, implement a method to count how many possible ways there are to express ‘n’ as the sum of 1, 3, or 4.
//

//
// EXAMPLE
//
// n : 4
// Number of ways = 4
// Explanation: Following are the four ways we can express 'n' : {1,1,1,1}, {1,3}, {3,1}, {4}
//
// n : 5
// Number of ways = 6
// Explanation: Following are the six ways we can express 'n' : {1,1,1,1,1}, {1,1,3}, {1,3,1}, {3,1,1}, {1,4}, {4,1}
//

//
// CODE
//
const cache = { 0: 1, 1: 1, 2: 1, 3: 2 };
function numberFactors(n) {
   // return dfs();
   // return memoization(n);
   return tabulation();

   // O(3^N)T | O(n)S
   function dfs() {
      // invalid case, we can't create sum for number less than zero.
      if (n < 0) {
         return 0;
      }

      if (n >= 0 && n <= 2) {
         // 0 -> base case: we don't need to substract anything; there is only one way.
         // 1 -> we can substract 1 once; that's the only way.
         // 2 -> we can substract 1 twice; that's the only way.
         return 1;
      }

      // 3 can be expressed as {3} or {1, 1, 1}
      if (n === 3) {
         return 2;
      }

      return dfs(n - 1) + dfs(n - 3) + dfs(n - 4);
   }

   // O(n)TS
   function memoization(n) {
      if (n < 0) {
         return 0;
      }
      // we have included all preset calculations for n where 0 <= n >= 3.
      if (n in cache) {
         return cache[n];
      }

      cache[n] = memoization(n - 1) + memoization(n - 3) + memoization(n - 4);

      return cache[n];
   }

   // O(n)T | O(1)S
   function tabulation() {
      if (n < 0) {
         return 0;
      }

      const calc = { 0: 1, 1: 1, 2: 1, 3: 2 };

      for (let i = 4; i <= n; i++) {
         sum = calc[i - 1] + calc[i - 3] + calc[i - 4];
         // remove the smallest key (i-4) from `calc` hash table
         // cause we won't need that for any future numbers
         delete calc[i - 4];
         // add new key for `i`th sum which will be needed
         // calculate sum of future numbers
         calc[i] = sum;
      }

      return calc[n];
   }
}

//
// TEST
//
console.log(`Number of ways: ---> ${numberFactors(4)}`);
console.log(`Number of ways: ---> ${numberFactors(5)}`);
console.log(`Number of ways: ---> ${numberFactors(6)}`);
console.log(`Number of ways: ---> ${numberFactors(100)}`);
