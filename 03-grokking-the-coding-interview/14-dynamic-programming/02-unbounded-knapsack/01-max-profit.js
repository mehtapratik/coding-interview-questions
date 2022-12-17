//
// INSTRUCTIONS
//
// Given the weights and profits of ‘N’ items, we are asked to put these items in a knapsack that
// has a capacity ‘C’. The goal is to get the maximum profit from the items in the knapsack.
// The only difference between the 0/1 Knapsack problem and this problem is that we are allowed
// to use an unlimited quantity of an item.
//

//
// EXAMPLE
//
// Let’s take the example of Merry, who wants to carry some fruits in the knapsack to get
// maximum profit. Here are the weights and profits of the fruits:
//
// Items: { Apple, Orange, Melon }
// Weights: { 1, 2, 3 }
// Profits: { 15, 20, 50 }
// Knapsack capacity: 5
//
// Let’s try to put different combinations of fruits in the knapsack, such that their total
// weight is not more than 5.
//
// 5 Apples (total weight 5) => 75 profit
// 1 Apple + 2 Oranges (total weight 5) => 55 profit
// 2 Apples + 1 Melon (total weight 5) => 80 profit
// 1 Orange + 1 Melon (total weight 5) => 70 profit
//
// This shows that 2 apples + 1 melon is the best combination, as it gives us the maximum
// profit and the total weight does not exceed the capacity.
//

//
// EXPLANATION
//
// The only difference between the 0/1 Knapsack problem and this one is that, after
// including the item, we recursively call to process all the items (including the
// current item). In 0/1 Knapsack, however, we recursively call to process the
// remaining items.
//

//
// CODE
//
function maxProfit(items, capacity) {
   const cache = [];
   // return nonDpSolution();
   // return dfs(0, capacity);
   // return memoization(0, capacity);
   return tabulation();

   // O(nlogn)T OR O(c)T | O(1)S
   // if n = 2 and c = 10, then O(c)T
   // if n = 10 and c = 1, then O(n * logn)
   function nonDpSolution() {
      for (let item of items) {
         item.profitPerUnit =
            Math.round((item.profit / item.weight) * 100) / 100;
      }

      items.sort((a, b) =>
         a.profitPerUnit === b.profitPerUnit
            ? b.weight - a.weight
            : b.profitPerUnit - a.profitPerUnit
      );

      let maxProfit = 0;
      let remainingCapacity = capacity;
      let i = 0;
      while (i < items.length || remainingCapacity > 0) {
         const item = items[i++];
         while (item.weight <= remainingCapacity) {
            maxProfit += item.profit;
            remainingCapacity -= item.weight;
         }
      }

      return maxProfit;
   }

   // O(2^n+c)TS
   function dfs(currentIndex, remainingCapacity) {
      if (currentIndex >= items.length || remainingCapacity <= 0) {
         return 0;
      }

      const currentItem = items[currentIndex];

      const profitWithInclusion =
         currentItem.weight <= remainingCapacity
            ? currentItem.profit +
              dfs(currentIndex, remainingCapacity - currentItem.weight)
            : 0;
      const profitWithExclusion = dfs(currentIndex + 1, remainingCapacity);

      return Math.max(profitWithInclusion, profitWithExclusion);
   }

   // O(n*c)TS
   function memoization(currentIndex, remainingCapacity) {
      cache[currentIndex] = cache[currentIndex] || {};
      if (remainingCapacity in cache[currentIndex]) {
         return cache[currentIndex][remainingCapacity];
      }
      if (currentIndex >= items.length || remainingCapacity <= 0) {
         return 0;
      }

      const currentItem = items[currentIndex];
      const profitWithInclusion =
         currentItem.weight <= remainingCapacity
            ? currentItem.profit +
              memoization(currentIndex, remainingCapacity - currentItem.weight)
            : 0;

      const profithWithExclusion = memoization(
         currentIndex + 1,
         remainingCapacity
      );

      cache[currentIndex][remainingCapacity] = Math.max(
         profitWithInclusion,
         profithWithExclusion
      );

      return cache[currentIndex][remainingCapacity];
   }

   // O(n * c)T | O(C)S
   function tabulation() {
      const ITEMS_COUNT = items.length;
      const dp = Array(ITEMS_COUNT)
         .fill(0)
         .map(() => Array(capacity + 1).fill(0));

      for (let n = 0; n < ITEMS_COUNT; n++) {
         for (let c = 0; c <= capacity; c++) {
            const inclusionProfit =
               items[n].weight <= c
                  ? items[n].profit + dp[n][c - items[n].weight]
                  : 0;

            const exclusionProfit = n > 0 ? dp[n - 1][c] : 0;

            dp[n][c] = Math.max(inclusionProfit, exclusionProfit);
         }
      }

      showSelectedItems(dp);
      return dp[ITEMS_COUNT - 1][capacity];
   }

   function showSelectedItems(dp) {
      console.log(dp);
      let remainingCapacity = capacity;
      let remainingProfit = dp[items.length - 1][capacity];
      let i = items.length - 1;
      while (remainingProfit > 0) {
         if (i === 0 || remainingProfit !== dp[i - 1][remainingCapacity]) {
            console.log(items[i]);
            remainingCapacity -= items[i].weight;
            remainingProfit -= items[i].profit;
         } else {
            i--;
         }
      }
   }
}

//
// TEST
//
// const items = [
//    { weight: 1, profit: 15 },
//    { weight: 3, profit: 50 },
//    { weight: 4, profit: 60 },
//    { weight: 5, profit: 90 },
// ];

const items = [
   { weight: 1, profit: 15 },
   { weight: 2, profit: 20 },
   { weight: 3, profit: 50 },
];

// const items = [
//    { weight: 2, profit: 20 },
//    { weight: 2, profit: 10 },
// ];

console.log(maxProfit(items, 5));
