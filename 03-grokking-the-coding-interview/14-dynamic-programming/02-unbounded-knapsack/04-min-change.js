//
// INSTRUCTIONS
//
// Given an infinite supply of ‘n’ coin denominations and a total money amount,
// we are asked to find the minimum number of coins needed to make up that amount.
//

//
// EXAMPLE
//
// Denominations: {1,2,3}
// Total amount: 5
// Output: 2
// Explanation: We need a minimum of two coins {2,3} to make a total of '5'
//
// Denominations: {1,99,100}
// Total amount: 396
// Output: 1
// Explanation: We need a minimum of one coins {99} to make a total of '396'
//

//
// CODE
//
function minChange(coins, amount) {
   const cache = {};
   // return dfs(0, amount);
   // return memoization(0, amount);
   // return tabulation();
   return tabulationCompressed();

   function dfs(index, remainingAmount) {
      // base case -> you cannot use any coins if remaining amount is zero
      if (remainingAmount === 0) {
         return 0;
      }
      // unsuccessfull attempts -> we could not create exact amount in current path
      // we indicate this fact with using -1
      if (remainingAmount < 0 || index >= coins.length) {
         return -1;
      }

      let include = -1;
      let exclude = -1;
      // include current coin only if remaining amount is greater or equal to
      // current denomination. Since we can use unlimited number of same denominations
      // we are not going to increment the index
      if (remainingAmount >= coins[index]) {
         include = dfs(index, remainingAmount - coins[index]);
         // if current dfs path succeeded in creating exact amount,
         // value will be anything but -1. If so, add one
         // more since we're including current denomination
         if (include >= 0) {
            include++;
         }
      }
      exclude = dfs(index + 1, remainingAmount);

      if (exclude === -1 || include === -1) {
         // if either of dfs path returned -1, it means one (or both) of the path could not create exact amount.
         // in that case, return higher of either value to indicate number of coins required to tend the amount.
         return Math.max(include, exclude);
      } else {
         // otherwise, return minimum # of coins generated from either
         // include of exclude path
         return Math.min(include, exclude);
      }
   }

   function memoization(index, remainingAmount) {
      const CACHE_KEY = `${index},${remainingAmount}`;
      if (CACHE_KEY in cache) {
         return cache[CACHE_KEY];
      }
      if (remainingAmount === 0) {
         return 0;
      }
      if (remainingAmount < 0 || index >= coins.length) {
         return -1;
      }

      let include = -1;
      let exclude = -1;
      if (remainingAmount >= coins[index]) {
         include = memoization(index, remainingAmount - coins[index]);

         if (include !== -1) {
            include++;
         }
      }

      exclude = memoization(index + 1, remainingAmount);
      if (include === -1 || exclude === -1) {
         cache[CACHE_KEY] = Math.max(include, exclude);
      } else {
         cache[CACHE_KEY] = Math.min(include, exclude);
      }

      return cache[CACHE_KEY];
   }

   function tabulation() {
      const table = Array(coins.length)
         .fill(0)
         .map(() => Array(amount + 1).fill(0));

      for (let c = 0; c < coins.length; c++) {
         for (let a = 0; a <= amount; a++) {
            let include = Number.MAX_VALUE;
            let exclude = Number.MAX_VALUE;
            if (a >= coins[c]) {
               include = table[c][a - coins[c]] + 1;
            }

            if (c > 0) {
               exclude = table[c - 1][a];
            }
            if (include === Number.MAX_VALUE && exclude === Number.MAX_VALUE) {
               table[c][a] = 0;
            } else {
               table[c][a] = Math.min(include, exclude);
            }
         }
      }

      if (table[coins.length - 1][amount] > 0) {
         showSelectedCoins(table);
      }
      return table[coins.length - 1][amount];
   }

   // you must use rows (# of coins) x column (amount) DP table to identify
   // exact coins used with help of original `coins` and `amount` arguments.
   // if you use further optimizations techniques on DP table, such as using just 2 rows
   // or 1 row, you lose ability to identify exact coins used to generate
   // given amount.
   function showSelectedCoins(table) {
      let remainingAmount = amount;
      let c = table.length - 1;
      while (remainingAmount > 0) {
         if (
            c === 0 ||
            table[c][remainingAmount] !== table[c - 1][remainingAmount]
         ) {
            remainingAmount -= coins[c];
            console.log(
               `Selected coin: ${coins[c]}. Remaining Amount: ${remainingAmount}`
            );
         } else {
            c--;
         }
      }
   }

   function tabulationCompressed() {
      const table = Array(amount + 1).fill(Number.MAX_VALUE);

      for (let c = 0; c < coins.length; c++) {
         for (let a = 0; a <= amount; a++) {
            let include = Number.MAX_VALUE;
            let exclude = table[a];
            if (a >= coins[c]) {
               include = table[a - coins[c]] + 1;
            }
            if (include === Number.MAX_VALUE && exclude === Number.MAX_VALUE) {
               table[a] = 0;
            } else {
               table[a] = Math.min(include, exclude);
            }
         }
      }

      return table[amount];
   }
}

//
// TEST
//
console.log(minChange([1, 2, 3], 5));
console.log(minChange([1, 2, 3], 11));
console.log(minChange([1, 99, 100], 396));
console.log(minChange([99, 100], 1));
