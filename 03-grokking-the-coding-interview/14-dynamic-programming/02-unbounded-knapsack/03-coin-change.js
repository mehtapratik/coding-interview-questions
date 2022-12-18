//
// INSTRUCTIONS
//
// Given an infinite supply of ‘n’ coin denominations and a total money amount,
// we are asked to find the total number of distinct ways to make up that amount.
//

//
// EXAMPLE
//
// Denominations: {1,2,3}
// Total amount: 5
// Output: 5
// Explanation: There are five ways to make the change for '5', here are those ways:
//   1. {1,1,1,1,1}
//   2. {1,1,1,2}
//   3. {1,2,2}
//   4. {1,1,3}
//   5. {2,3}
//

//
// PREPARATION
//

//
// CODE
//
function coinChange(coins, amount) {
   const cache = [];
   // return dfs(0, amount);
   // return memoization(0, amount);
   // return tabulation();
   return tabulation1c();

   // O(2 ^ (c + a))T | O(c + a)S
   function dfs(index, remainingAmount) {
      if (index >= coins.length || remainingAmount < 0) {
         return 0;
      }
      if (remainingAmount === 0) {
         return 1;
      }

      let inclusionCount = 0;
      let exclusionCount = 0;
      if (remainingAmount >= coins[index]) {
         inclusionCount = dfs(index, remainingAmount - coins[index]);
      }

      exclusionCount = dfs(index + 1, remainingAmount);

      return inclusionCount + exclusionCount;
   }

   // O(c * a)TS
   function memoization(index, remainingAmount) {
      cache[index] = cache[index] || {};
      if (remainingAmount in cache[index]) {
         return cache[index][remainingAmount];
      }
      if (index >= coins.length || remainingAmount < 0) {
         return 0;
      }
      if (remainingAmount === 0) {
         return 1;
      }

      let inclusionCount = 0;
      let exclusionCount = 0;
      if (remainingAmount >= coins[index]) {
         inclusionCount = memoization(index, remainingAmount - coins[index]);
      }

      exclusionCount = memoization(index + 1, remainingAmount);

      cache[index][remainingAmount] = inclusionCount + exclusionCount;

      return cache[index][remainingAmount];
   }

   //O(c * a)TS
   function tabulation() {
      const table = Array(coins.length)
         .fill(0)
         .map(() => Array(amount + 1).fill(0));

      for (let c = 0; c < coins.length; c++) {
         const coin = coins[c];
         for (let a = 0; a <= amount; a++) {
            // we can make amount `0` once and only once by not using any given coin
            if (a === 0) {
               table[c][a] = 1;
               continue;
            }

            let inclusionCount = 0;
            let exclusionCount = 0;

            // # of ways we can make amount `a` if we INCLUDE current `coin` (coins[c])
            if (coin <= a) {
               inclusionCount = table[c][a - coin];
            }

            // # of ways we can make amount `a` if we EXCLUDE current `coin` (coins[c])
            if (c > 0) {
               exclusionCount = table[c - 1][a];
            }

            //# of ways we can make amount `a` for current `coin` (coins[c])
            table[c][a] = inclusionCount + exclusionCount;
         }
      }

      return table[coins.length - 1][amount];
   }

   // O(c * a)T | O(a)S
   function tabulation1c() {
      const table = Array(amount + 1).fill(0);

      table[0] = 1;
      for (let coin of coins) {
         // there isn't any need to loop from zero since
         // amount less than coin size cannot be used
         for (let a = coin; a <= amount; a++) {
            // same as table[a - coin] (include) + table[a] (exclude)
            table[a] += table[a - coin];
         }
      }

      return table[amount];
   }
}

//
// TEST
//
console.log(coinChange([1, 2, 3], 5));
