//
// INSTRUCTIONS
//
// Given a rod of length ‘n’, we are asked to cut the rod and sell the pieces in a way
// that will maximize the profit.We are also given the price of every piece of length
// ‘i’ where ‘1 <= i <= n’.
//

//
// EXAMPLE
//
// Lengths: [1, 2, 3, 4, 5]
// Prices: [2, 6, 7, 10, 13]
// Rod Length: 5
//
// Let’s try different combinations of cutting the rod:
//
// Five pieces of length 1 => 10 price
// Two pieces of length 2 and one piece of length 1 => 14 price
// One piece of length 3 and two pieces of length 1 => 11 price
// One piece of length 3 and one piece of length 2 => 13 price
// One piece of length 4 and one piece of length 1 => 12 price
// One piece of length 5 => 13 price
//
// This shows that we get the maximum price (14) by cutting the rod into two pieces of length ‘2’ and one piece of length ‘1’.
//

//
// PREPARATION
//
class RodPricing {
   length;
   price;
   unitPrice;
   constructor(length, price) {
      this.length = length;
      this.price = price;
      this.unitPrice = Math.round((price / length) * 100) / 100;
   }
}

//
// CODE
//
function maxProfit(rodPricing, rodLength) {
   const cache = [];
   // return dfs(0, rodLength);
   // return memoization(0, rodLength);
   // return tabulation();
   return sortAndPrioritize();

   // O(rlogr)T OR O(l)T | O(1)S
   // if r = 2 and l = 10, then O(l)T
   // if r = 10 and l = 1, then O(r * logr)T
   function sortAndPrioritize() {
      const output = { profit: 0, selections: [] };
      rodPricing.sort((a, b) => {
         if (a.unitPrice === b.unitPrice) {
            return b.length - a.length;
         } else {
            return b.unitPrice - a.unitPrice;
         }
      });

      let remainingRodLength = rodLength;
      let i = 0;
      while (i < rodPricing.length || remainingRodLength > 0) {
         if (remainingRodLength >= rodPricing[i].length) {
            output.selections.push(rodPricing[i]);
            remainingRodLength -= rodPricing[i].length;
            output.profit += rodPricing[i].price;
         } else {
            i++;
         }
      }

      return output;
   }

   // O(2^(r+l))TS
   function dfs(index, remainingLength) {
      // base case -->
      // you cannot make any profit if your current index
      // is outside rodPricing array or remaining rod length is
      // zero or less
      if (index >= rodPricing.length || remainingLength <= 0) {
         return 0;
      }

      const rodPrice = rodPricing[index];
      // Identify maximum achievable profit if current rodPricing length is smaller than remaining
      // rod length and if we include the item in pricing calculation. Notice that we did not
      // increasement the index because we can use same rodPricing object multiple time to
      // calculate profit as long as remaining rod length is greater than zero.
      const profitWithInclusion =
         remainingLength >= rodPrice.length
            ? rodPrice.price + dfs(index, remainingLength - rodPrice.length)
            : 0;

      // Identify maximum achievable profit if we excludecurrent item from pricing calculation
      const profitWithExclusion = dfs(index + 1, remainingLength);

      // Return maximum profit
      return Math.max(profitWithInclusion, profitWithExclusion);
   }

   // O(r * l)TS
   function memoization(index, remainingLength) {
      // Memoization --> avoid recalculating for same arguments twice
      cache[index] = cache[index] || {};
      if (remainingLength in cache[index]) {
         return cache[index][remainingLength];
      }

      // base case -->
      // you cannot make any profit if your current index
      // is outside rodPricing array or remaining rod length is
      // zero or less
      if (index >= rodPricing.length || remainingLength <= 0) {
         return 0;
      }

      const rodPrice = rodPricing[index];
      // Identify maximum achievable profit if current rodPricing length is smaller than remaining
      // rod length and if we include the item in pricing calculation. Notice that we did not
      // increasement the index because we can use same rodPricing object multiple time to
      // calculate profit as long as remaining rod length is greater than zero.
      const profitWithInclusion =
         remainingLength >= rodPrice.length
            ? rodPrice.price +
              memoization(index, remainingLength - rodPrice.length)
            : 0;

      // Identify maximum achievable profit if we excludecurrent item from pricing calculation
      const profitWithExclusion = memoization(index + 1, remainingLength);

      // save maximum profit in cache before returning the result
      cache[index][remainingLength] = Math.max(
         profitWithInclusion,
         profitWithExclusion
      );

      return cache[index][remainingLength];
   }

   // O(r * l)TS
   function tabulation() {
      const table = new Array(rodPricing.length)
         .fill(0)
         .map(() => Array(rodLength + 1).fill(0));

      for (let r = 0; r < rodPricing.length; r++) {
         const { price, length } = rodPricing[r];
         for (let l = 0; l <= rodLength; l++) {
            let profitIfIncluded = 0;
            let profitIfExcluded = 0;
            if (length <= l) {
               profitIfIncluded = price + table[r][l - length];
            }

            if (r > 0) {
               profitIfExcluded = table[r - 1][l];
            }

            table[r][l] = Math.max(profitIfIncluded, profitIfExcluded);
         }
      }

      showSelectedRods(table);
      return table[rodPricing.length - 1][rodLength];
   }

   function showSelectedRods(table) {
      console.log(table);
      let r = rodPricing.length - 1;
      let remainingRodLength = rodLength;
      while (remainingRodLength > 0) {
         if (
            r <= 0 ||
            table[r][remainingRodLength] !== table[r - 1][remainingRodLength]
         ) {
            console.log(rodPricing[r]);
            remainingRodLength -= rodPricing[r].length;
         } else {
            r--;
         }
      }
   }
}

//
// TEST
//
const rodPricing = [
   new RodPricing(1, 2),
   new RodPricing(2, 6),
   new RodPricing(3, 7),
   new RodPricing(4, 10),
   new RodPricing(5, 13),
];

console.log(maxProfit(rodPricing, 5));
